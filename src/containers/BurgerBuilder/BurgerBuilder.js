import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/actions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Loader from '../../components/UI/Spinner/Spinner';

export class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    pruchasing: false,
    loader: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.props.onAuthRedirectPath(sum > 0)
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ pruchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };
  purchaseCancelHadler = () => {
    this.setState({ pruchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummery;
    let burger = <Loader />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            pruchasing={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            hassError={this.props.error}
          />
        </Aux>
      );

      orderSummery = (
        <OrderSummery
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHadler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    if (this.props.error) {
      burger = (
        <p style={{ textAlign: 'center' }}>{this.props.error.message}</p>
      );
    }

    return (
      <Aux>
        {burger}
        <Modal show={this.state.pruchasing} disable={this.purchaseCancelHadler}>
          {orderSummery}
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingType) => dispatch(actions.add(ingType)),
    onRemoveIngredient: (ingType) => dispatch(actions.remove(ingType)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onAuthRedirectPath: (isBuilding) => dispatch(actions.authRedirectPath(isBuilding))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
