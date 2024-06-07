"use client"
import styles from './contactCard.module.css';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import GenericButton from '@/components/buttons/GenericButton';
import translateRol from '@/context/translate';
import { sendRequestToConnect, fetchAllConnectionsOfAnUser } from '@/utils/fetchData';
import { BasicUserInfoWithIdInterface } from '@/types/BasicUserInfoWithId.interface';
import { AuthContext } from '@/context/auth';
interface Props {
    user: BasicUserInfoWithIdInterface;
    isConnected: boolean;
}

const ContactCard: React.FC<Props> = ({ user, isConnected }) => {
    const {id, token} = useContext(AuthContext);
    const [connected, setConnected] = useState(false);
    const [connections, setConnections] = useState<string[]>([]);
    const [label, setLabel] = useState(isConnected ? "Conectado" : "Conectar");

    const connectUser = async () => {
      const body = {
        user_id: id,
        connected_user_id: user.user_id
      }
        try {
            await sendRequestToConnect(body, token);
            fetchConnections(token, id);
            checkIfConnected();
        } catch (error) {
            console.error("Failed to connect user:", error);
        }
    }

    const fetchConnections = async (token:string, id: string) => {
        try {
          const response = await fetchAllConnectionsOfAnUser(token, id);
          setConnections(response);
        } catch (error) {
          console.error("Failed to fetch connections:", error);
        } 
      }

    const checkIfConnected = () => {
        connections.includes(user.user_id) ? setConnected(true) : setConnected(false);
        if(!connected){
            setLabel("¡Enviado!");
        }
    }

    return (
        <article className={styles.contentUserInfo}>
            {/* TO DO TAKE ALWAYS THE IMG FROM RESPONSE */}
            <Image className={styles.userImage} src={user.profile_picture} alt={`${user.username}_image`} width={100} height={100}/>
            <h1 className={styles.infoHighlight}>{user.username}</h1>
            <p className={styles.info}>{translateRol(user.rol)}</p>
            <div className={styles.stadistics}>
                <p className={[styles.info, styles.flexInfo].join(' ')}>Publicaciones <span>{user.count_of_publications}</span></p>
                <p className={[styles.info, styles.flexInfo].join(' ')}>Contactos <span>{user.count_of_connections}</span></p>
            </div>
            <GenericButton label={label} onClick={connectUser} className={isConnected ? `${styles.connectButton} ${styles.connectButtonIsConnected}` : styles.connectButton} disabled={isConnected}></GenericButton>
        </article>
    );
}

export default ContactCard;
