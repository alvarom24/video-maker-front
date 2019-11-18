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

const Course = () => {
  return (
    <Query query={QUERY_ALL}>
      {result => {
        if (result.loading) return <CircularProgress className='loader' />;
        if (result.error) return <p>{result.error.message}</p>;
        if (result.data && result.data.allCourses.length > 0) {
          return <Layout video={result.data.allCourses[0]} />;
        } else {
          return 'There is one or more videos in DB please drop';
        }
      }}
    </Query>
  );
};

export default Course;
