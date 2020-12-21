import React from 'react';
import { withRouter } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';
import classes from './Logo.css';
const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img
            src={Logo}
            alt={'Burger Builder Logo'}
            style={{ cursor: 'pointer' }}
            onClick={() => props.history.push('/')}
        />
    </div>
);

export default withRouter(logo);
