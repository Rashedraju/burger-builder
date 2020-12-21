import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputEl = null;
  let inputStyle = [classes.Input];

  if (props.validation && props.touched) {
    inputStyle.push(classes.Invalid);
  }

  switch (props.inputtype) {
    case 'input':
      inputEl = (
        <input
          className={inputStyle.join(' ')}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case 'textarea':
      inputEl = <textarea className={classes.Input} />;
      break;
    case 'select':
      inputEl = (
        <select
          className={classes.Select}
          onChange={props.changed}
          value={props.value}
        >
          {props.config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={classes.Input}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return <div>{inputEl}</div>;
};

export default input;
