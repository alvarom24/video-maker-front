import React, { useState, Fragment } from 'react';
import Layout from '../components/results/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const QUERY_ALL_RESULTS = gql`
  {
    allResults {
      courseId
      user
      userAnswers
      correctAnswers
    }
  }
`;

const Results = () => {
  return (
    <Fragment>
      <Query query={QUERY_ALL_RESULTS}>
        {result_R => {
          if (result_R.loading) return <CircularProgress className='loader' />;
          if (result_R.error) return <p>{result_R.error.message}</p>;
          if (result_R.data && result_R.data.allResults.length > 0) {
            return <Layout results={result_R.data.allResults} />;
          } else {
            return 'There are not results to show';
          }
        }}
      </Query>
    </Fragment>
  );
};

export default Results;
