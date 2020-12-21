import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import * as actions from './store/actions';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    isSignup: true,
    controls: {
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Email Address',
        },
        value: '',
        validity: {
          type: 'string',
          required: true,
          maxLength: 50,
        },
        valid: false,
        touched: false,
      },
      password: {
        elType: 'input',
        elConfig: {
          type: 'password',
          name: 'email',
          placeholder: 'Password',
        },
        value: '',
        validity: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = updateObject(this.state.controls, {
      [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        this.state.controls[inputIdentifier].validity,
        inputIdentifier
      )
    })})

    this.setState({
      controls: updatedControls,
    });
  };

  authHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthAction = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    const inputElements = [];

    for (let key in this.state.controls) {
      inputElements.push({
        key: key,
        config: this.state.controls[key],
      });
    }

    let form = (
      <form onSubmit={this.authHandler}>
        {[
          inputElements.map((formElement) => (
            <Input
              key={formElement.key}
              inputtype={formElement.config.elType}
              config={formElement.config.elConfig}
              value={formElement.config.value}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.key)
              }
              validation={!formElement.config.valid}
              touched={formElement.config.touched}
            />
          )),
        ]}
        <Button type='submit' btnType='Success'>
          {this.state.isSignup ? 'SignUP' : 'Login'}
        </Button>
      </form>
    );

    if (this.props.loading) form = <Spinner />;

    let errorMessage = this.props.error ? (
      <p style={{ testAlign: 'center' }}>{this.props.error.message}</p>
    ) : null;

    let authRedirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.redirectPath} />
    ) : null;

    return (
      <div className={classes.Controls}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button btnType='Danger' clicked={this.switchAuthAction}>
          Switch to {!this.state.isSignup ? ' SignUP' : ' Login'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    redirectPath: state.burgerBuilder.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, method) =>
      dispatch(actions.auth(email, password, method)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
