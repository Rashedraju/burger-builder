import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import ToggleMenu from '../SideDrawer/ToggleMenu/ToggleMenu';

const Toolbar = props => (
    <header className={classes.Toolbar}>
        <ToggleMenu toggle={props.toggleHandler}/>
        <Logo link={'/'}/>
        <nav className={classes.DesktopOnly}> <NavigationItems isAuth={props.isAuthenticated}/></nav>
    </header>
);

export default Toolbar;