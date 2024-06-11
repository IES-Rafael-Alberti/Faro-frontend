// components/AuthInfoAside.tsx

import React from 'react';
import Button from '@/components/buttons/button';

interface AuthInfoAsideProps {
    styles: any; 
    headerMessage: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  }
  
  const AuthInfoAside: React.FC<AuthInfoAsideProps> = ({ headerMessage, text, buttonText, buttonLink, styles }) => (
    <aside className={styles.authInfo}>
      <h3 className={styles.authInfoTitle}>{headerMessage}</h3>
      <p className={styles.authInfoText}>{text}</p>
      <Button className={styles.registerButton} text={buttonText} href={buttonLink} />
    </aside>
  );
  
  export default AuthInfoAside;