import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/actions';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    loader: false,
  };
  componentDidMount() {
    this.props.fatchOrders(this.props.token, this.props.userId);
  }

  delOrderHandler = (id) => {
    this.props.delOrder(id, this.props.token);
  };

  render() {
    let order =
      this.props.orders.length > 0 ? (
        this.props.orders.map((el) => (
          <Order
            data={el}
            key={el.orderId}
            id={el.orderId}
            delOrder={this.delOrderHandler}
          />
        ))
      ) : (
        <p style={{ textAlign: 'center', margin: '10px' }}>
          Please Order Something
        </p>
      );

    if (this.props.loader) order = <Spinner />;

    if (this.props.error) {
      order = <p style={{ textAlign: 'center' }}>{this.props.error.message}</p>;
    }

    return <div>{order}</div>;
  }
}

const mapStateFromProps = (state) => {
  return {
    orders: state.orders.orders,
    error: state.orders.error,
    loader: state.orders.loader,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchFromProps = (dispatch) => {
  return {
    fatchOrders: (token, userId) => dispatch(actions.fatchOrders(token, userId)),
    delOrder: (id, token) => dispatch(actions.delOrder(id, token)),
  };
};

export default connect(mapStateFromProps, mapDispatchFromProps)(Orders);
