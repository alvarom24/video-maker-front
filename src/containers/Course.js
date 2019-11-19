import React from 'react';
import Layout from '../components/course/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const QUERY_ALL = gql`
  {
    allCourses {
      id
      title
      videoUrl
      question
      answers
      prompAt
    }
  }
`;
const CREATE_RESULT = gql`
  mutation createResult(
    $courseId: String!
    $videoUrl: String!
    $user: String!
    $userAnswers: String!
    $correctAnswers: String!
  ) {
    insertResult(
      courseId: $courseId
      user: $user
      videoUrl: $videoUrl
      userAnswers: $userAnswers
      correctAnswers: $correctAnswers
    ) {
      courseId
      videoUrl
    }
  }
`;

const Course = () => {
  const [createResult, { loading, error }] = useMutation(CREATE_RESULT);

  const handleFinishVideo = variables => {
    try {
      createResult({ variables: variables });
      if (error) {
        console.log(error);
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
          return (
            <Layout
              video={result.data.allCourses[0]}
              handleFinishVideo={variables => handleFinishVideo(variables)}
            />
          );
        } else {
          return 'There is not course available';
        }
      }}
    </Query>
  );
};

export default Course;
