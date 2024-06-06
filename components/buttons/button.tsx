import React from 'react';
import styles from './button.module.css';
import { montserrat } from '../../app/ui/fonts';
import { useRouter } from 'next/navigation';

interface ButtonProps{
    className: string,
    text: string,
    href: string
}

const Button = ({ className, text, href }: ButtonProps) => {
    const router = useRouter();

    const redirect = () => {
        router.push(href);
    }
    
    return (
        <button className={[className, styles.commonButton, `${montserrat.className} antialiased`].join(' ')} onClick={redirect}>
            {text}
        </button>    
    );
}

export default Button;