"use client"
import styles from './contactCard.module.css';
import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import GenericButton from '@/components/buttons/GenericButton';
import translateRol from '@/app/context/translate';
import { sendRequestToConnect, fetchAllConnectionsOfAnUser } from '@/utils/fetchData';
import { BasicUserInfoWithIdInterface } from '@/types/BasicUserInfoWithId.interface';
import { AuthContext } from '@/app/context/auth';
import { UserMessageInterface } from '@/types/user-message.interface';
interface Props {
    user: BasicUserInfoWithIdInterface;
    isConnected: boolean;
}

/**
 * Component for displaying user contact information and interaction options.
 * 
 * @component
 * @param {object} user - User information object.
 * @param {boolean} isConnected - Indicates whether the user is already connected.
 * @returns {JSX.Element} - The JSX element representing the contact card.
 */
const ContactCard: React.FC<Props> = ({ user, isConnected }) => {
    const {id, token} = useContext(AuthContext);
    const [connected, setConnected] = useState(isConnected);
    const [connections, setConnections] = useState<UserMessageInterface[]>([]);
    const [label, setLabel] = useState(connected ? "Conectado" : "Conectar");
    const [buttonClass, setButtonClass] = useState(connected ? `${styles.connectButton} ${styles.connectButtonIsConnected}` : styles.connectButton);
    const [buttonClicked, setButtonClicked] = useState(false);

    /**
     * Function to send a connection request to the user.
     */
    const connectUser = async () => {
      const body = {
        user_id: id,
        connected_user_id: user.user_id
      }
        try {
            await sendRequestToConnect(body, token);
            fetchConnections(token, id);
            setButtonClicked(true);
        } catch (error) {
            console.error("Failed to connect user:", error);
        }
    }

    /**
     * Function to fetch the connections of the current user.
     * 
     * @param {string} token - User authentication token.
     * @param {string} id - User ID.
     */
    const fetchConnections = async (token: string, id: string) => {
      try {
        const response = await fetchAllConnectionsOfAnUser(token, id);
        setConnections(response);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };
    
    /**
     * Effect hook to check if the user is connected.
     */
    useEffect(() => {
      checkIfConnected();
    }, [connections]);

    /**
     * Function to check if the user is connected and update button label and style accordingly.
     */
    const checkIfConnected = () => {
      if (connections.includes(user.user_id)) {
          setConnected(true);
          setLabel("Conectado");
          setButtonClass(`${styles.connectButton} ${styles.connectButtonIsConnected}`);
      } else if(buttonClicked) {
          setLabel("¡Enviado!");
          setButtonClass(`${styles.connectButton} ${styles.connectionIsSending}`);
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
            <GenericButton label={label} onClick={connectUser} className={buttonClass} disabled={connected}></GenericButton>
        </article>
    );
}

export default ContactCard;
