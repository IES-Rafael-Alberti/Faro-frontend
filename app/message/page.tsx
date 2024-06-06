"use client"
import styles from "./page.module.css";
import Image from "next/image";
import translateRol from "@/context/translate";

export default function Message() {

    // TO DO : QUE EL MENSAJE DE PREVISUALIZACIÓN SE CORTE A PARTIR DE "X" CARACTERES Y QUE SE AÑADA "..." AL FINAL PARA MANTENER EL CUADRO DE MENSAJES BIEN
    // (REFERENCIA DE LARGO MENSAJE DE MARÍA)

    const users = [
        { id: 1, name: 'Juan Pérez', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Hola, ¿qué tal?'},
        { id: 2, name: 'María López', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Hola, la verdad es que estaba muy cansada el otro día...'},
        { id: 3, name: 'Pedro Gómez', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Apruébame el tfg por favor'},
        { id: 4, name: 'Juan Pérez', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Hola, ¿qué tal?'},
        { id: 5, name: 'María López', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Hola, la verdad es que estaba muy cansada el otro día...'},
        { id: 6, name: 'Pedro Gómez', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Apruébame el tfg por favor'},
        { id: 7, name: 'Juan Pérez', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Hola, ¿qué tal?'},
        { id: 8, name: 'María López', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Hola, la verdad es que estaba muy cansada el otro día...'},
        { id: 9, name: 'Pedro Gómez', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Apruébame el tfg por favor'},
        { id: 10, name: 'Juan Pérez', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Hola, ¿qué tal?'},
        { id: 11, name: 'María López', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Hola, la verdad es que estaba muy cansada el otro día...'},
        { id: 12, name: 'Pedro Gómez', avatar: '/imgs/no-user-image.jpg', rol: 'student', last_msg_date: '2024-06-03', last_msg: 'Apruébame el tfg por favor'},
    ]

    const parseDate = (date: string) => {
        const [year, month, day] = date.split('-');
        const formattedDate = `${day}.${month}`;
        return formattedDate;
    }

  return (
    <main className={styles.wrapper}>
        <section className={styles.chatsContainer}>
            <div className={styles.overflowActive}>
                {users.map(user => (
                    <article className={styles.chat} key={user.id}>
                        <Image className={styles.userImg} src={user.avatar} alt={user.name} width={50} height={50}/>
                        <div className={styles.flex}>
                            <h2 className={styles.username}>{user.name}</h2>
                            <p className={styles.messageInfo}><span>{parseDate(user.last_msg_date)}</span> - {user.last_msg}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
        <section className={styles.messageContainer}>
                <header className={styles.userInfo}>
                <Image className={styles.userImgMessage} src={users[0].avatar} alt={users[0].name} width={75} height={75}/>
                    <div className={styles.flex}>
                        <h1 className={styles.usernameMessage}>{users[0].name}</h1>
                        <p className={styles.messageInfo}>{translateRol(users[0].rol)}</p>
                    </div>
                </header>
                <article className={styles.messages}>
                    <p className={`${styles.msg} ${styles.receiver}`}>
                        {/* AQUÍ VA MENSAJE DE ENDPOINT */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        {/* AQUÍ VA LA FECHA Y HORA DEL MENSAJE DEL MENSAJE CON EL FORMATO DEL EJEMPLO */}
                        <span className={styles.date}>11. abril, 12:25 pm</span> 
                    </p>
                    {/* ESTO ES REPETIDO POR BUCLE CON LOS MENSAJES QUE HAYA, SI EL ID ES EL DEL USUARIO CONECTADO TIENE LA CLASS SENDER Y SI ES EL OTRO, TIENE LA CLASS RECEIVER */}
                    <p className={`${styles.msg} ${styles.sender}`}>
                        No sé qué decirte
                    </p>
                    <p className={`${styles.msg} ${styles.receiver}`}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <p className={`${styles.msg} ${styles.receiver}`}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </article>
                <textarea rows={4} placeholder="Escribe un mensaje..."></textarea>
        </section>
    </main>
  );
}
