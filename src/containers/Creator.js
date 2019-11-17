import React, { useState, useEffect } from 'react';
import Layout from '../components/creator/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery, useMutation } from '@apollo/react-hooks';
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
  const { loading2, error2, data2 } = useQuery(QUERY_ALL);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Query query={QUERY_ALL}>
      {result => {
        if (result.loading) return <CircularProgress className='loader' />;
        if (result.error) return <p>{result.error.message}</p>;
        if (result.data && result.data.allCourses.length > 0) {
          return 'There is one or more videos in DB please drop';
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
  );
};

export default Creator;
