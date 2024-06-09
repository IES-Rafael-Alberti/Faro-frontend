// components/GenericInput.js
import React from 'react';
import classNames from 'classnames';
import styles from './genericInput.module.css';

const GenericInput = ({
  type = 'text',
  name = '',
  value = '',
  onChange = (e:any) => {},
  placeholder = '',
  error = '',
  containerClass = '',
  inputClass = '',
  container = false,
  ...props
}) => {
  return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={name}
            className={inputClass}
            {...props}
        />
  );
};

export default GenericInput;
