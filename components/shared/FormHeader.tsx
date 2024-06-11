// components/FormHeader.tsx

import React from 'react';

interface FormHeaderProps {
  title: string;
  subtitle: string;
  styles: any;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, styles }) => (
  <>
    <h1 className={styles.authTitle}>{title}</h1>
    <h2 className={styles.authSubtitle}>{subtitle}</h2>
  </>
);

export default FormHeader;
