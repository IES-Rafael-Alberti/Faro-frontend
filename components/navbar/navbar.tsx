import React from 'react';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHouse , faPowerOff, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { montserrat } from '../../app/ui/fonts';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '../icons';

const Navbar = () => (
    <aside className={styles.containerNav}>
        <Image src="/imgs/logoFaroBlanco.png" alt="logoFaro" width={100} height={100} />
        <nav>
            <ul className={styles.navList}>
                <li className={styles.navLink}>
                    <Link href="/feed">
                        <FontAwesomeIcon icon={faHouse} className={styles.icon} /><br/>
                        Inicio
                    </Link>
                </li>
                <li className={styles.navLink}>
                    <Link href="/search">
                        <FontAwesomeIcon icon={faSearch} className={styles.icon} /><br/>
                        Buscador
                    </Link>
                </li>
                <li className={styles.navLink}>
                    <Link href="/profile">
                        <FontAwesomeIcon icon={faUser} className={styles.icon} /><br/>
                        Perfl
                    </Link>
                </li>
                <li className={styles.navLink}>
                    <Link href="/message">
                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /><br/>
                        Mensaje
                    </Link>
                </li>
                <li className={styles.navLink}>
                    <Link href="/login">
                        <FontAwesomeIcon icon={faPowerOff} className={styles.icon} /><br/>
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    </aside>
);

export default Navbar;