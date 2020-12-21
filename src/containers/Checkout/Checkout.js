import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import ErrorBoundary from '../../hoc/ErrorBoundary/ErrorBoundary';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinudeHandler = () => {
    this.props.history.push(this.props.match.url + '/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;
    if (this.props.ings) {
      summary = (
        <Aux>
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinude={this.checkoutContinudeHandler}
          />
          <Route
            path={this.props.match.url + '/contact-data'}
            render={(props) => (
              <ErrorBoundary>
                <ContactData {...props} />
              </ErrorBoundary>
            )}
          />
        </Aux>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.price,
  };
};
export default connect(mapStateToProps)(Checkout);
