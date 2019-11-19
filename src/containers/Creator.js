import React, { useState, Fragment } from 'react';
import Layout from '../components/creator/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const QUERY_ALL = gql`
  {
    allCourses {
      title
    }
  }
`;

const CREATE_COURSE = gql`
  mutation createCourse(
    $title: String!
    $videoUrl: String!
    $question: String!
    $answers: String!
    $prompAt: String
    $prompValue: String
  ) {
    insertCourse(
      title: $title
      videoUrl: $videoUrl
      question: $question
      answers: $answers
      prompAt: $prompAt
      prompValue: $prompValue
    ) {
      id
      title
      videoUrl
      question
      answers
      prompAt
      prompValue
    }
  }
`;

const Creator = () => {
  const [isLoading, setIsloading] = useState(false);
  const [finishSave, setFinishSave] = useState('unFinished');
  const [createCourse, { loading, error }] = useMutation(CREATE_COURSE);
  const handleSaveVideo = video => {
    setIsloading(true);
    setFinishSave('unFinished');
    const variables = {
      title: video.title,
      videoUrl: video.videoUrl,
      question: video.question,
      answers: JSON.stringify(video.answers),
      prompAt: video.prompAt.toString(),
      prompValue: 'm',
    };
    try {
      createCourse({ variables: variables });
      if (!loading) {
        setIsloading(loading);
        setFinishSave('finished');
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Query query={QUERY_ALL}>
        {result => {
          if (result.loading) return <CircularProgress className='loader' />;
          if (result.error) return <p>{result.error.message}</p>;
          if (result.data && result.data.allCourses.length > 0) {
            return 'There is already a video in the database';
          } else {
            return (
              <Layout
                key={finishSave}
                saveAnswer={video => handleSaveVideo(video)}
                isLoading={isLoading}
                finishSave={finishSave}
              />
            );
          }
        }}
      </Query>
    </Fragment>
  );
};

export default Creator;
