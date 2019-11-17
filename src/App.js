import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import Sidebar from './components/shared/sidebar/Sidebar';
import Header from './components/shared/Header';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import Creator from './containers/Creator';
import Course from './containers/Course';

const client = new ApolloClient({
  uri: 'http://localhost:3002/course',
});
client
  .query({
    query: gql`
      {
        courseById(id: "5dd03cb57aa7d50517c8822c") {
          answers
        }
      }
    `,
  })
  .then(result => console.log(result));

const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
  content: {
    marginTop: 54,
  },
  mainBlock: {
    backgroundColor: '#F7F8FC',
    padding: 30,
  },
});

const App = () => {
  const [selectedItem, setSelectedItem] = useState('Creator');
  return (
    <ApolloProvider client={client}>
      <Router>
        <Row className={css(styles.container)}>
          <Sidebar
            selectedItem={selectedItem}
            onChange={selectedItem => setSelectedItem(selectedItem)}
          />
          <Column flexGrow={1} className={css(styles.mainBlock)}>
            <Header title={selectedItem} />
            <div className={css(styles.content)}>
              <Switch>
                <Route path='/creator'>
                  <Creator />
                </Route>
                <Route path='/course'>
                  <Course />
                </Route>
                <Route path='/'>
                  <Creator />
                </Route>
              </Switch>
            </div>
          </Column>
        </Row>
      </Router>
    </ApolloProvider>
  );
};

export default App;
