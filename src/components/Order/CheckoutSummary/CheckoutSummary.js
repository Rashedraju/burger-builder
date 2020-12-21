import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';

const checkoutSummary = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ margin: '1rem 0' }}>We hope it tastes well!</h2>
      <Burger ingredients={props.ingredients} />
      <div>
        <Button btnType='Success' clicked={props.checkoutContinude}>
          Continue
        </Button>
        <Button clicked={props.checkoutCanceled} btnType='Danger'>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default withRouter(checkoutSummary);
