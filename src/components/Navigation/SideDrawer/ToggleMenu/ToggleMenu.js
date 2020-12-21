import React from 'react';

import classes from './ToggleMenu.css';
const toggleMenu = props => (
    <div 
        className={classes.ToggleMenu}
        onClick={props.toggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
)

export default toggleMenu;