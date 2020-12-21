import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummery = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <Aux>
      <h2>Your Order</h2>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType={'Success'} clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
      <Button btnType={'Danger'} clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
    </Aux>
  );
};

export default orderSummery;
