"use client"
import styles from "./page.module.css";
import Button from "@/components/buttons/button";
import { montserrat } from "../ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Register() {

  const [name, setName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", lastName: "", email: "", password: "", confirmPassword: ""});

  const validateEmail = (email : string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNameOrLastName = (name : string) => {
    const nameRegex = /^[a-zA-ZáÁéÉíÍóÓúÚ\s]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    let valid = true;
    let errors = { name: "", lastName: "", email: "", password: "", confirmPassword: ""};

    if (!validateNameOrLastName(name)) {
      errors.name = "Por favor, introduzca un nombre válido.";
      valid = false;
    }

    if (!validateNameOrLastName(lastName)) {
      errors.lastName = "Por favor, introduzca un apellido válido.";
      valid = false;
    }

    if (!validateEmail(email)) {
      errors.email = "Por favor, introduzca un email válido.";
      valid = false;
    }

    if (password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
      valid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      console.log("Formulario válido, enviar datos");
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.authContainer}>
        <article className={styles.authForm}>
          <h1 className={styles.authTitle}>Registre</h1>
          <h2 className={styles.authSubtitle}>una nueva cuenta</h2>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div className={styles.dobleInputContainer}>
              {/* NOMBRE */}
              <div className={styles.nameContainer}>
                <input className={[styles.authInput, styles.dobleInput, `${montserrat.className} antialiased`].join(' ')} minLength={3} type="text" id="name" name="name" placeholder="nombre" aria-label="name" value={name} onChange={(e) => setName(e.target.value)} required />
                {errors.name && <small className={styles.error}>{errors.name}</small>}
              </div>
              {/* APELLIDO */}
              <div className={styles.lastNameContainer}>
                <input className={[styles.authInput, styles.dobleInput, `${montserrat.className} antialiased`].join(' ')} minLength={3} type="text" id="last-name" name="last-name" placeholder="apellido" aria-label="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                {errors.lastName && <small className={styles.error}>{errors.lastName}</small>}
              </div>
            </div>
            {/* EMAIL */}
            <input className={[styles.authInput, `${montserrat.className} antialiased`].join(' ')} type="text" id="email" name="email" placeholder="email" aria-label="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {errors.email && <small className={styles.error}>{errors.email}</small>}
            {/* PASSWORD */}
            <input className={[styles.authInput, `${montserrat.className} antialiased`].join(' ')} type="password" id="password" name="password" minLength={8} placeholder="contraseña" aria-label="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {errors.password && <small className={styles.error}>{errors.password}</small>}
            {/* CONFIRM PASSWORD */}
            <input className={[styles.authInput, `${montserrat.className} antialiased`].join(' ')} type="password" id="confirm-password" name="confirm-password" minLength={8} placeholder="confirmar contraseña" aria-label="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            {errors.confirmPassword && <small className={styles.error}>{errors.confirmPassword}</small>}
            <Link className={styles.linkToRegister} href="/login">¿Ya está registrado? Conéctese</Link>
            <button type="submit" className={[styles.registerButton, `${montserrat.className} antialiased`].join(' ')}>REGÍSTRESE</button>
          </form>
        </article>
        <aside className={styles.authInfo}>
          <h3 className={styles.authInfoTitle}>¿Ya está registrado?</h3>
          <p className={styles.authInfoText}>Si ya está registrado inicie sesión para acceder a su cuenta</p>
          <Button className={styles.registerButton} text="INICIE SESIÓN" href="/login"/>
        </aside>
      </section>
      <Image className={styles.logo} src="/imgs/logoFaro.png" alt="logoFaro.png" width={100} height={100} />
    </main>
  );
  
}
