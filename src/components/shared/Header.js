import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 14,
    border: '1px solid #DFE0EB',
  },
  container: {
    height: 40,
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  name: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'right',
    letterSpacing: 0.2,
  },
  separator: {
    borderLeft: '1px solid #DFE0EB',
    marginLeft: 32,
    marginRight: 32,
    height: 32,
    width: 2,
  },
  title: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: '30px',
    letterSpacing: 0.3,
  },
});

const Header = props => {
  const { icon, title, ...otherProps } = props;
  return (
    <Row
      className={css(styles.container)}
      vertical='center'
      horizontal='space-between'
      {...otherProps}
    >
      <span className={css(styles.title)}>{title}</span>
      <Row vertical='center'>
        <div className={css(styles.separator)}></div>
        <Row vertical='center'>
          <span className={css(styles.name, styles.cursorPointer)}>
            Alvaro Montes
          </span>
          <img
            src='https://avatars0.githubusercontent.com/u/15824792?s=400&u=9b950efd90e5952c321a0e66c151204b9072991b&v=4'
            alt='avatar'
            className={css(styles.avatar, styles.cursorPointer)}
          />
        </Row>
      </Row>
    </Row>
  );
};

Header.propTypes = {
  title: string,
};

export default Header;
