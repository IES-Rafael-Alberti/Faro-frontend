// Path: app/page.module.css
"use client"
import styles from "./page.module.css";
import Image from "next/image";
import Icon  from "../components/icons";
import Link from "next/link";
import Button from "@/components/buttons/button";

export default function Home() {

  return (
    <main className={styles.wrapper}>
      <section className={[styles.landing_header, styles.flex].join(' ')}>
        <Image className={styles.logo} src="/imgs/logoFaro.png" alt="FaroLogo" width={110} height={110}/>
        <p>Bienvenido a Faro, la web de I.E.S Rafael Alberti para encontrar sus prácticas de ciclo</p>
      </section>
        <section className={[styles.title, styles.flex].join(' ')}>
          <h1>La mejor <br/><span className={[styles.decoration, styles.deco1].join(' ')}>web</span>
          para <br/>encontrar <span className={[styles.decoration, styles.deco2].join(' ')}>prácticas</span> de ciclo</h1>
        </section>
        <Image className={styles.centerImage} src="/imgs/faroLanding.png" alt="FaroImg" width={300} height={300}/>
        <ul className={[styles.infoList, styles.flex].join(' ')}>
          <li className={styles.info}>
            <Icon src="/icons/chart.svg"/>
            <p>Encuentre las mejores empresas según su perfil y preferencias</p>
          </li>
          <li className={styles.info}>
            <Icon src="/icons/networking.svg" width={60} height={60} />
            <p>Mejore su networking, amplie su red de contacto fácilmente</p> 
          </li>
          <li className={styles.info}>
            <Icon src="/icons/newspaper.svg"/>
            <p>Infórmese de todas las novedades, no pierda ninguna oportunidad</p>
          </li>
        </ul>

        <h3 className={styles.authTitle}>Regístrese en nuestra comunidad</h3>
        <section className={styles.authContent}></section>
        <p className={styles.authInfo}>Disfrute de las ventajas de FARO autenticándose con su propia cuenta</p>
        <div className={styles.buttonsContainer}>
          <Button className={styles.authButton} text="Inicie Sesión" href="/login"/>
          <Button className={styles.authButton} text="Regístrese" href="/register"/>
        </div>

        <footer className={styles.containerFooter}>
          <ul className={styles.linksFooter}>
            <li className={styles.link}><Link href="#">Política de privacidad</Link></li>
            <li className={styles.link}><Link href="#">Cookies</Link></li>
            <li className={styles.link}><Link href="#">Contáctanos</Link></li>
            <li className={styles.link}><Link href="#">Autoría</Link></li>
          </ul>
        </footer>

    </main>
  );
}

