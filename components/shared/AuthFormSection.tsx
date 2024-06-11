// components/AuthFormSection.tsx

import React from 'react';
import GenericInput from './GenericInput';

interface AuthFormSectionProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  minLength?: number;
  required?: boolean;
  styles: any;
  montserratClassName: string;
  hasOutsideDiv: boolean 
}

const AuthFormSection: React.FC<AuthFormSectionProps> = ({ type, name, placeholder, value, onChange, error, minLength, required, styles, montserratClassName, hasOutsideDiv }) => (
  <>
    {hasOutsideDiv ? (
      <div className={styles.w48}>
        <GenericInput
          inputClass={[styles.authInput, styles.dobleInput, `${montserratClassName} antialiased`].join(' ')}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          minLength={minLength}
          required={required}
        />
        {error && <small className={styles.error}>{error}</small>}
      </div>
    ) : (
      <>
        <GenericInput
          inputClass={[styles.authInput, styles.dobleInput, `${montserratClassName} antialiased`].join(' ')}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          minLength={minLength}
          required={required}
        />
        {error && <small className={styles.error}>{error}</small>}
      </>
    )}
  </>
);

export default AuthFormSection;