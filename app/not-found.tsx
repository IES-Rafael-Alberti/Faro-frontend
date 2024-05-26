"use client"
import styles from "./not-found.module.css";
import Button from "@/components/buttons/button";
import Image from "next/image";


export default function Login() {
  return (
    <main className={styles.screen}>
      {/* <Image src="/imgs/404.png" alt="404Background" width={1280} height={820}/> */}
      <section className={styles.mainContent}>
        <h1 className={styles.text}>ERROR 404</h1>
        <h2 className={styles.text}>Página no encontrada</h2>
        <Button className={styles.button} text="Inicio" href="/"/>
      </section>
    </main>
  );
  
}
