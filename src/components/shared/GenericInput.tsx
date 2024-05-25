'use client'

import React from 'react'

const GenericInput = ({
  type = 'text',
  name = '',
  value = '',
  onChange = (e:any) => {},
  placeholder = '',
  label = '',
  error = '',
  className = '',
  ...props
}) => {
  return (
        <div className="input-container">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                id={name}
                className={`generic-input ${className}`}
                {...props}
            />
            {error && <span className="error">{error}</span>}
        </div>
  )
}

export default GenericInput
