'use client'

import React from 'react'

interface GenericButtonProps {
  label: string;
  onClick: (e:any) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * A reusable generic button component.
 * 
 * @param {string} label - The text to display on the button.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {boolean} disabled - Whether the button should be disabled (default: false).
 * @param {string} className - Additional CSS class for styling (default: '').
 * @returns {JSX.Element} - The JSX for the button component.
 */
const GenericButton = ({ label, onClick, disabled = false, className = '' }: GenericButtonProps): React.JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`generic-button ${className}`}
    >
      {label}
    </button>
  )
}

export default GenericButton
