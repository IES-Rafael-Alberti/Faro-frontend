import React, { useState, useContext } from 'react';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHouse, faPowerOff, faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/app/context/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

/**
 * Component for the navigation bar.
 * 
 * @component
 * @returns {JSX.Element} - The JSX element representing the navigation bar.
 */
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { setId, setToken, setIsLogged } = useContext(AuthContext);
    const router = useRouter();


    /**
     * Toggles the visibility of the navigation menu.
     */
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    /**
     * Logs the user out and redirects to the login page.
     */
    const logout = () => {
        setId('');
        setToken('');
        setIsLogged(false);
        router.push('/');
        setTimeout(() => {
            toast.success('Has cerrado sesión correctamente.')
        }, 200);
    }


    return (
        <div className={isOpen ? `${styles.container} ${styles.containerOpen}` : styles.container}>
        <button className={isOpen ? `${styles.menuButton} ${styles.buttonOpen}` : styles.menuButton} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
        </button>
        <aside className={`${styles.containerNav} ${isOpen ? styles.open : ''}`}>
            <div className={styles.header}>
                <Image src="/imgs/logoFaroBlanco.png" alt="logoFaro" width={100} height={100}/>
            </div>
            <nav className={isOpen ? styles.navOpen : styles.navClosed}>
                <ul className={styles.navList}>
                    <li className={styles.navLink}>
                        <Link href="/private/feed">
                            <FontAwesomeIcon icon={faHouse} className={styles.icon} />
                            <p>Inicio</p>
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/private/search">
                            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                            <p>Buscador</p>
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/private/profile">
                            <FontAwesomeIcon icon={faUser} className={styles.icon} />
                            <p>Perfil</p>
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/private/message">
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                            <p>Mensaje</p>
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/public/login" onClick={logout}>
                            <FontAwesomeIcon icon={faPowerOff} className={styles.icon} />
                            <p>Cerrar sesión</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    </div>
    );
};

export default Navbar;
