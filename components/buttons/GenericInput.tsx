// components/GenericInput.js
import React from 'react';

/**
 * A reusable generic input component.
 *
 * @param {string} type - The type of input (default: 'text').
 * @param {string} name - The name attribute of the input.
 * @param {string} value - The value of the input.
 * @param {function} onChange - The function to call when the input value changes.
 * @param {string} placeholder - The placeholder text for the input.
 * @param {string} containerClass - Additional CSS class for the input container.
 * @param {string} inputClass - Additional CSS class for the input element.
 * @param {boolean} container - Whether to render an additional container for the input (default: false).
 * @param {...any} props - Additional props to be passed to the input element.
 * @returns {JSX.Element} - The JSX for the input component.
 */
const GenericInput = ({
  type = 'text',
  name = '',
  value = '',
  onChange = (any: any) => any,
  placeholder = '',
  containerClass = '',
  inputClass = '',
  container = false,
  ...props
}) => {
  return (
    <>
      {container ? (
        <div className={containerClass}>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={name}
            className={inputClass}
            aria-label={name}
            {...props}
          />
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={name}
          aria-label={name}
          className={inputClass}
          {...props}
        />
      )}
    </>
  );
};

export default GenericInput;
