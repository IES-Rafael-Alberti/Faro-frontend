"use client"
import styles from "./page.module.css";
import Button from "@/components/buttons/button";
import { montserrat } from "../ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { authPost } from "@/utils/authApi";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { token, setToken, isLogged, setIsLogged, id, setId } = useContext(AuthContext);

  const validateEmail = (email : string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    let valid = true;
    let errors = { email: "", password: "" };

    if (!validateEmail(email)) {
      errors.email = "Por favor, introduzca un email válido.";
      valid = false;
    }
    if (password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      const data = {
        "email": email,
        "password": password
      }
      authPost("auth/signIn", data).then((response) => {
        setToken(response.access_token);
        setIsLogged(true);
        // setId(response.id);
      })
      .catch((error) => {
          console.error("Error al enviar datos de autenticación:", error.message);
      });
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.authContainer}>
        <article className={styles.authForm}>
          <h1 className={styles.authTitle}>Conéctese</h1>
          <h2 className={styles.authSubtitle}>a su cuenta</h2>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input className={[styles.authInput, `${montserrat.className} antialiased`].join(' ')} type="text" id="email" name="email" placeholder="email" aria-label="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {errors.email && <small className={styles.error}>{errors.email}</small>}
            <input className={[styles.authInput, `${montserrat.className} antialiased`].join(' ')} type="password" id="password" name="password" minLength={8} placeholder="contraseña" aria-label="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {errors.password && <small className={styles.error}>{errors.password}</small>}
            <Link className={styles.linkToRegister} href="/register">¿Aún no tiene una cuenta? Regístrese</Link>
            <button type="submit" className={[styles.loginButton, `${montserrat.className} antialiased`].join(' ')}>INICIE SESIÓN</button>
          </form>
        </article>
        <aside className={styles.authInfo}>
          <h3 className={styles.authInfoTitle}>¿Nuevo en faro?</h3>
          <p className={styles.authInfoText}>Únase a nuestra comunidad y disfrute todas las ventajas que nuestra web le ofrece</p>
          <Button className={styles.registerButton} text="REGÍSTRESE" href="/register"/>
        </aside>
      </section>
      <Image className={styles.logo} src="/imgs/logoFaro.png" alt="logoFaro.png" width={100} height={100} />
    </main>
  );
  
}
