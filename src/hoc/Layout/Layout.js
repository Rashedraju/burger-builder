import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuth}
          toggleHandler={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuth}
          open={this.state.showSideDrawer}
          disable={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}> {this.props.children} </main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
