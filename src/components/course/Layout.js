import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
});

const Layout = props => {
  return (
    <Row
      className={css(styles.container)}
      horizontal='center'
      vertical='center'
    ></Row>
  );
};

Layout.propTypes = {
  courseRecord: PropTypes.shape({}),
};

export default Layout;
