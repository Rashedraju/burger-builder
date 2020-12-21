import React from 'react';
import classes from './Order.css';

const order = (props) => {
  let ingItem = [];
  for (let key in props.data.ingredients) {
    ingItem.push(
      <p key={key} className={classes.ingItem}>{`${key} (${props.data.ingredients[key]})`}</p>
    );
  }
  return (
    <div className={classes.Order}>
      <div className={classes.OrderDetails}>
        <div style={{ marginBottom: '5px' }}>Ingredients: {ingItem}</div>
        <p>
          Price:{' '}
          <strong>USD {Number.parseFloat(props.data.price).toFixed(2)}</strong>
        </p>
      </div>
      <button className={classes.RemoveBtn} onClick={() => props.delOrder(props.id)}>&times;</button>
    </div>
  );
};

export default order;
