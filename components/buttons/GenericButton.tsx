'use client'

import React from 'react'

interface GenericButtonProps {
  label: string;
  onClick: (e:any) => void;
  disabled?: boolean;
  className?: string;
}

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
