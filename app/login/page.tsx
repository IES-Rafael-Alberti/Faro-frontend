"use client";
import styles from "./page.module.css";
import Button from "@/components/buttons/button";
import { montserrat } from "../ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import { authPost } from "@/utils/authApi";
import { AuthContext } from "@/app/context/auth";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const { setToken, setIsLogged, setId } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };

    try {
      const response = await authPost("auth/signIn", data);
      if (response && response.access_token && response.id) {
        setToken(response.access_token);
        setIsLogged(true);
        setId(response.id);
        router.push('/feed');
      }
    } catch (e) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.authContainer}>
        <article className={styles.authForm}>
          <h1 className={styles.authTitle}>Conéctese</h1>
          <h2 className={styles.authSubtitle}>a su cuenta</h2>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input
              className={[styles.authInput, montserrat.className, "antialiased"].join(' ')}
              type="text"
              id="email"
              name="email"
              placeholder="email"
              aria-label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={[styles.authInput, montserrat.className, "antialiased"].join(' ')}
              type="password"
              id="password"
              name="password"
              placeholder="contraseña"
              aria-label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <small className={styles.error}>{error}</small>}
            <Link className={styles.linkToRegister} href="/register">¿Aún no tiene una cuenta? Regístrese</Link>
            <button type="submit" className={[styles.loginButton, montserrat.className, "antialiased"].join(' ')}>INICIE SESIÓN</button>
          </form>
        </article>
        <aside className={styles.authInfo}>
          <h3 className={styles.authInfoTitle}>¿Nuevo en faro?</h3>
          <p className={styles.authInfoText}>Únase a nuestra comunidad y disfrute todas las ventajas que nuestra web le ofrece</p>
          <Button className={styles.registerButton} text="REGÍSTRESE" href="/register" />
        </aside>
      </section>
      <Image className={styles.logo} src="/imgs/logoFaro.png" alt="logoFaro.png" width={100} height={100} />
    </main>
  );
}
