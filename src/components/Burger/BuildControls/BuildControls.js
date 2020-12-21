import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Chesse', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]
const buildControls = props => (
        <div className={classes.BuildControls}>
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(cur => {
                return <BuildControl 
                        key={cur.label} 
                        label={cur.label} 
                        type={cur.type}
                        add={() => props.addIngredient(cur.type)}
                        remove={() => props.removeIngredient(cur.type)}
                        disable={props.disabled[cur.type]}/>
            })}
            <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.pruchasing}>{props.isAuth ? 'ORDER NOW' : 'Login/Signup to Order'}</button>
        </div>
);
export default buildControls;