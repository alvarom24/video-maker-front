import React from 'react';
import { Column } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import Logo from './Logo';
import MenuItem from './MenuItem';
import IconArticles from '../../../assets/icon-articles';
import IconSettings from '../../../assets/icon-settings';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#363740',
    width: 255,
    paddingTop: 32,
  },
  menuItemList: {
    marginTop: 52,
  },
  separator: {
    borderTop: '1px solid #DFE0EB',
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06,
  },
});

const Sidebar = props => {
  return (
    <Column className={css(styles.container)}>
      <Logo />
      <Column className={css(styles.menuItemList)}>
        <MenuItem
          title='Creator'
          icon={IconSettings}
          onClick={() => props.onChange('Creator')}
          active={props.selectedItem === 'Creator'}
        />
        <div className={css(styles.separator)}></div>
        <MenuItem
          title='Course'
          icon={IconArticles}
          onClick={() => props.onChange('Course')}
          active={props.selectedItem === 'Course'}
        />
      </Column>
    </Column>
  );
};

export default Sidebar;
