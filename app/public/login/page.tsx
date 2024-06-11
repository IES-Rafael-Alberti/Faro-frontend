// pages/login.js

'use client'

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/components/buttons/button";
import { montserrat } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { authPost } from "@/utils/authApi";
import { AuthContext } from "@/app/context/auth";
import AuthFormSection from "@/components/shared/AuthFormSection";
import FormHeader from "@/components/shared/FormHeader";
import AuthInfoAside from "@/components/shared/AuthInfoAside";

/**
 * 
 * This component provides a login form that allows users to authenticate into the application.
 * 
 * @returns {JSX.Element} - The JSX element representing the login page.
 */
  const Login = () : JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const { setToken, setIsLogged, setId } = useContext(AuthContext);
  const router = useRouter();

  /**
   * Function to handle form submission for login.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = { email: email, password: password }; // Login data.

    try {
      const response = await authPost("auth/signIn", data); // Sending login request.
      if (response && response.access_token && response.id) {
        setToken(response.access_token);
        setIsLogged(true);
        setId(response.id);
        router.push('/private/feed');
      }
    } catch (e) {
      setError("Credenciales inválidas."); // Handling login errors.
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.authContainer}>
        <article className={styles.authForm}>
          <FormHeader title="Conéctese" subtitle="a su cuenta" styles={styles} />
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <AuthFormSection
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styles={styles}
              montserratClassName={montserrat.className}
              hasOutsideDiv={false}
            />
            <AuthFormSection
              type="password"
              name="password"
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              styles={styles}
              montserratClassName={montserrat.className}
              hasOutsideDiv={false}
            />
            {error && <small className={styles.error}>{error}</small>}
            <Link className={styles.linkToRegister} href="/public/register">¿Aún no tiene una cuenta? Regístrese</Link>
            <button type="submit" className={[styles.loginButton, montserrat.className, "antialiased"].join(' ')}>INICIE SESIÓN</button>
          </form>
        </article>
        <aside className={styles.authInfo}>
          <h3 className={styles.authInfoTitle}>¿Nuevo en faro?</h3>
          <p className={styles.authInfoText}>Únase a nuestra comunidad y disfrute todas las ventajas que nuestra web le ofrece</p>
          <Button className={styles.registerButton} text="REGÍSTRESE" href="/public/register" />
        </aside>
      </section>
      <Image className={styles.logo} src="/imgs/logoFaro.png" alt="logoFaro.png" width={100} height={100} />
    </main>
  );
};

export default Login;
