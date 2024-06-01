"use client"
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface';
import styles from './contactCard.module.css';
import React from 'react';
import Image from 'next/image';
import GenericButton from '@/components/buttons/GenericButton';
import translateRol from '@/context/translate';

interface Props {
    user: BasicUserInfoInterface;
}

const ContactCard: React.FC<Props> = ({ user }) => {


    return (
        <article className={styles.contentUserInfo}>
            {/* TO DO TAKE ALWAYS THE IMG FROM RESPONSE */}
            <Image className={styles.userImage} src={user.profile_picture ? user.profile_picture : '/imgs/no-user-image.jpg'} alt={`${user.username}_image`} width={100} height={100}/>
            <h1 className={styles.infoHighlight}>{user.username}</h1>
            <p className={styles.info}>{translateRol(user.rol)}</p>
            <div className={styles.stadistics}>
                <p className={[styles.info, styles.flexInfo].join(' ')}>Publicaciones <span>{user.count_of_publications}</span></p>
                <p className={[styles.info, styles.flexInfo].join(' ')}>Contactos <span>{user.count_of_connections}</span></p>
            </div>
            <GenericButton label="Conectar" onClick={translateRol} className={styles.connectButton}></GenericButton>
        </article>
    );
}

export default ContactCard;
