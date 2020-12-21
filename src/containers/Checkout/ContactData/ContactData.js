import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import * as actions from './store/actions';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../shared/utility'

class ContactData extends Component {
  state = {
    btnDisable: true,
    orderInput: {
      name: {
        elType: 'input',
        elConfig: {
          type: 'text',
          name: 'name',
          placeholder: 'Enter Your Name',
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
      email: {
        elType: 'input',
        elConfig: {
          type: 'text',
          name: 'email',
          placeholder: 'Enter Your Email',
        },
        value: '',
        validity: {
          type: 'string',
          required: true,
          maxLength: 62,
        },
        valid: false,
        touched: false,
      },
      street: {
        elType: 'input',
        elConfig: {
          type: 'text',
          name: 'street',
          placeholder: 'Street',
        },
        value: '',
        validity: {
          type: 'string',
          required: true,
          maxLength: 95,
        },
        valid: false,
        touched: false,
      },
      postal: {
        elType: 'input',
        elConfig: {
          name: 'postal',
          placeholder: 'ZIP Code',
        },
        value: '',
        validity: {
          type: 'number',
          required: true,
          maxLength: 11,
        },
        valid: false,
        touched: false,
      },
      city: {
        elType: 'input',
        elConfig: {
          type: 'text',
          name: 'city',
          placeholder: 'City',
        },
        value: '',
        validity: {
          type: 'string',
          required: true,
          maxLength: 35,
        },
        valid: false,
        touched: false,
      },
      country: {
        elType: 'select',
        elConfig: {
          options: [
            { value: 'bangladesh', displayValue: 'Bangladesh' },
            { value: 'india', displayValue: 'India' },
          ],
        },
        valid: true,
        value: '',
      },
    },
  };

  componentWillUnmount() {
    this.props.onRedirect();
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderInputVal = updateObject(this.state.orderInput[inputIdentifier], {
        value: event.target.value,
        touched: true,
      });

    const updatedOrderInput = updateObject(this.state.orderInput, {
      [inputIdentifier]: updateObject(updatedOrderInputVal, {
        valid: checkValidity(
          updatedOrderInputVal.value,
          updatedOrderInputVal.validity,
          inputIdentifier
        )
      })
    })
    
    let btnDisable = this.orderBtnDisableHandler(updatedOrderInput);
    this.setState({
      orderInput: updatedOrderInput,
      btnDisable: btnDisable,
    });
  };

  orderHandler = () => {
    const customerData = {};
    for (let key in this.state.orderInput) {
      customerData[key] = this.state.orderInput[key].value;
    }
    const orderData = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      customerData: customerData,
      userId: this.props.userId
    };

    this.props.orderSubmit(orderData, this.props.token);
  };

  errorDismissHandler = () => {
    this.setState({ error: null });
  };

  orderBtnDisableHandler = (formEl) => {
    let orderBtnDisable = true;
    for (let key in formEl) {
      orderBtnDisable = formEl[key].valid && orderBtnDisable;
    }
    return !orderBtnDisable;
  };

  render() {
    let redirect = this.props.redirect ? <Redirect to='/' /> : null;

    const inputElements = [];

    for (let key in this.state.orderInput) {
      inputElements.push({
        key: key,
        config: this.state.orderInput[key],
      });
    }

    let userForm = this.props.loader ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
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
        <Button btnType='Success' disable={this.state.btnDisable}>
          Order
        </Button>
      </form>
    );

    let errorMessage = this.props.error ? (
      <p style={{ textAlign: 'center' }}>{this.props.error.message}</p>
    ) : null;
    
    return (
      <Aux>
        {redirect}
        {errorMessage}
        <div className={classes.ContactData}>
          <h2>Enter Your Contact Data</h2>
          {userForm}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.price,
    error: state.checkoutOrder.error,
    loader: state.checkoutOrder.loader,
    redirect: state.checkoutOrder.redirect,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderSubmit: (orderData, token) =>
      dispatch(actions.submitOrder(orderData, token)),
    onRedirect: () => dispatch(actions.redirectAfterSubmit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
