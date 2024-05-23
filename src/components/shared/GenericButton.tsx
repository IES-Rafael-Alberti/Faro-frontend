import React from 'react'

interface GenericButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const GenericButton: React.FC<GenericButtonProps> = ({ label, onClick, disabled = false, className = '' }) => {
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
