import React, { useState } from 'react';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHouse, faPowerOff, faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                        <Link href="/feed">
                            <FontAwesomeIcon icon={faHouse} className={styles.icon} />
                            <p>Inicio</p>
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/search">
                            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                            <p>Buscador</p>
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/profile">
                            <FontAwesomeIcon icon={faUser} className={styles.icon} />
                            <p>Perfil</p>
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/message">
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                            <p>Mensaje</p>
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/login">
                            <FontAwesomeIcon icon={faPowerOff} className={styles.icon} />
                            <p>Logout</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    </div>
    );
};

export default Navbar;
