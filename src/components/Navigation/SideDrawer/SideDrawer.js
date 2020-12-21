import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  return (
    <Aux>
      <Backdrop show={props.open} disabled={props.disable} />
      <nav
        className={
          props.open
            ? [classes.SideDrawer, classes.Open].join(' ')
            : [classes.SideDrawer, classes.Close].join(' ')
        }
        onClick={props.disable} 
      >
        <Logo height={'10%'} link={'/'} />
        <NavigationItems isAuth={props.isAuthenticated}/>
      </nav>
    </Aux>
  );
};

export default sideDrawer;
