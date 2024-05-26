import React from 'react';
import styles from './button.module.css';
import { montserrat } from '../../app/ui/fonts';
import Link from 'next/link';

interface ButtonProps{
    className: string,
    text: string,
    href: string
}



const Button = ({ className, text, href }: ButtonProps) => (
    <Link href={href}>
        <button className={[className, styles.commonButton, `${montserrat.className} antialiased`].join(' ')}>
            {text}
        </button>    
    </Link>

);

export default Button;
