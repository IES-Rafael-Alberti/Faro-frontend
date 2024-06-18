'use client'
import styles from "./page.module.css";
import Image from "next/image";
import translateRol from "@/app/context/translate";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/app/context/auth";
import { fetchAllConnectionsOfAnUser, fetchMessagesFromUser } from "@/utils/fetchData";
import { MessageInterface } from "@/types/message.interface";
import { UserMessageInterface } from "@/types/user-message.interface";
import { submitMessage } from "@/utils/submitData";
import Icon from "@/components/icons";

/**
 * This component provides a messaging interface where users can chat with their contacts.
 *
 * @returns {JSX.Element} - The JSX element representing the message page.
 */
export default function Message(): JSX.Element {
    const { id, token } = useContext(AuthContext); // Authentication context to get user ID and token.
    const currentMessage = useRef<HTMLTextAreaElement>(null); // Reference to the current message textarea.
    const [selectedContact, setSelectedContact] = useState<string>(''); // State for the selected contact ID.
    const [contacts, setContacts] = useState<UserMessageInterface[]>([]); // State for the user's contacts.
    const [messages, setMessages] = useState<MessageInterface[]>([]); // State for the messages with the selected contact.

    // Function to sort messages in ascending order based on timestamp.
    const sortedMessages = [...messages].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    /**
     * Fetches the user's connected contacts and sets the last contact as the selected contact.
     */
    const getUsersConnectedTo = async () => {
        try {
            const response = await fetchAllConnectionsOfAnUser(token, id);
            setContacts(response);
            if (response.length > 0) {
                const lastContact = response[response.length - 1];
                setSelectedContact(lastContact.id);
            }
        } catch (error) {
            throw error;
        }
    };

    /**
     * Fetches messages from the selected contact.
     *
     * @param {string} contactId - The ID of the selected contact.
     */
    const fetchMessages = async (contactId: string) => {
        if (contactId) {
            try {
                const fetchedMessages = await fetchMessagesFromUser(id, contactId, token);
                setMessages(fetchedMessages);
                const lastMessage = fetchedMessages.length > 0 ? fetchedMessages[fetchedMessages.length - 1] : { date: null, message: '' };
                setContacts(prevContacts =>
                    prevContacts.map(contact =>
                        contact.id === contactId
                            ? { ...contact, last_msg: lastMessage.msg, last_msg_date: lastMessage.date }
                            : contact
                    )
                );
            } catch (error) {
                throw error;
            }
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await getUsersConnectedTo();
        };
        initialize();
    }, []);

    useEffect(() => {
        if (selectedContact) {
            fetchMessages(selectedContact);
        }
        // Set up an interval to fetch messages every 500 milliseconds
        const intervalId = setInterval(() => {
            if (selectedContact) {
                fetchMessages(selectedContact);
            }
        }, 2000);
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [selectedContact]);

    useEffect(() => {
        console.log(messages)
    },[messages])

    /**
     * Handles the form submission to send a message.
     *
     * @param {React.FormEvent} event - The form submission event.
     */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior.
        const message = currentMessage.current?.value; // Get the value of the textarea with null check.
        if (message) {
            await submitMessage(message, id, selectedContact, token); // Submit the message.
            await fetchMessages(selectedContact); // Fetch the updated messages.
            currentMessage.current.value = ''; // Clear the textarea after submitting.
        }
    };

    /**
     * Handles the key down event to submit the message when Enter key is pressed without Shift key.
     *
     * @param {React.KeyboardEvent<HTMLTextAreaElement>} event - The key down event.
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) { // Check if Enter key was pressed without shift.
            handleSubmit(event); // Call the handleSubmit function.
        }
    };

    /**
     * Parses an ISO date string to a formatted date string hour:minutes and in case it's not today, to day/month
     *
     * @param {string} isoDate - The ISO date string.
     * @returns {string} - The formatted date string.
     */
    const parseDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const today = new Date();
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
        return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    } else {
        return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2);
    }
    };

    return (
        <main className={styles.wrapper}>
            {(contacts.length < 1) ? <p>No hay contactos.</p> : (
            <>
                <section className={styles.chatsContainer}>
                    <div className={styles.overflowActive}>
                        {contacts.map(contact => (
                            <article className={styles.chat} key={contact.id} onClick={() => setSelectedContact(contact.id)}>
                                <Image className={styles.userImg} src={contact.avatar} alt={contact.name as string} width={50} height={50} />
                                <div className={styles.flex}>
                                    <h2 className={styles.username}>{contact.name}</h2>
                                    <p className={styles.messageInfo}><span>{contact.last_msg_date ? parseDate(contact.last_msg_date.toString()) : ''}</span> - {contact.last_msg}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.messageContainer}>
                    <header className={styles.userInfo}>
                        {contacts.find(contact => contact.id === selectedContact) && (
                            <>
                                <Image className={styles.userImgMessage} src={contacts.find(contact => contact.id === selectedContact)?.avatar || ''} alt={contacts.find(contact => contact.id === selectedContact)?.name as string} width={75} height={75} />
                                <div className={styles.flex}>
                                    <h1 className={styles.usernameMessage}>{contacts.find(contact => contact.id === selectedContact)?.name}</h1>
                                    <p className={styles.messageInfo}>{translateRol(contacts.find(contact => contact.id === selectedContact)?.rol as string)}</p>
                                </div>
                            </>
                        )}
                    </header>
                    <article className={styles.messages}>
                        {sortedMessages.map((msg) => (
                            <p key={msg.message_id} className={`${styles.msg} ${msg.sender_id === id ? styles.sender : styles.receiver}`}>
                                {msg.msg} - <span className={styles.date}>{parseDate(msg.date as string)}</span>
                            </p>
                        ))}
                    </article>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.chatboxContainer}>
                            <textarea rows={4} ref={currentMessage} placeholder="Escribe un mensaje..." onKeyDown={handleKeyDown} className={styles.textarea}></textarea>
                            <div onClick={handleSubmit} className={styles.iconContainer}><Icon src="/icons/sendIcon.png" width={25} height={25}/></div>
                        </div>
                    </form>
                </section>
            </>)}
        </main>
    );
}
