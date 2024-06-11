import React from 'react';
import styles from './button.module.css';
import { montserrat } from '../../app/ui/fonts';
import { useRouter } from 'next/navigation';

interface ButtonProps {
    className: string,
    text: string,
    href: string
}

/**
 * Reusable button component.
 * Redirects to a specific route when clicked.
 *
 * @param {string} className - CSS class for button styling.
 * @param {string} text - Text to be displayed on the button.
 * @param {string} href - Route to which the button will redirect when clicked.
 */
const Button = ({ className, text, href }: ButtonProps) => {
    const router = useRouter();

    /**
     * Function to redirect to the specified route.
     */
    const redirect = () => {
        router.push(href);
    }
    
    return (
        <button 
            className={[className, styles.commonButton, `${montserrat.className} antialiased`].join(' ')} 
            onClick={redirect}
        >
            {text}
        </button>    
    );
}

export default Button;
