import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
  title: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: '24px',
    letterSpacing: '0.4px',
    color: '#A4A6B3',
    opacity: 0.7,
    marginLeft: 12,
  },
  image: {
    width: '51px',
    position: 'relative',
    right: '42px',
  },
});

const LogoComponent = () => {
  return (
    <Row
      className={css(styles.container)}
      horizontal='center'
      vertical='center'
    >
      <img
        src='https://mk0thinkificig8baqk3.kinstacdn.com/wp-content/themes/thinkific/assets/images/thinkific-icon.svg'
        className={css(styles.image)}
      />
      <span className={css(styles.title)}>Thinkific</span>
    </Row>
  );
};

export default LogoComponent;
