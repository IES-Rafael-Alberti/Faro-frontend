// pages/register.js
"use client";

import { useContext, useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/shared/GenericButton";
import { montserrat } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { authPost } from "@/app/utils/authApi";
import GenericInput from "@/components/shared/GenericInput";
import { AuthContext } from "../context/auth"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { user, setUser } = useContext(AuthContext);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNameOrLastName = (name:string) => {
    const nameRegex = /^[a-zA-ZáÁéÉíÍóÓúÚ\s]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    let valid = true;
    let validationErrors: { 
      name?: string, 
      lastName?: string 
      email?: string,
      password?: string,
      confirmPassword?: string
    } = {};
    

    if (!validateNameOrLastName(formData.name)) {
      validationErrors.name = "Por favor, introduzca un nombre válido.";
      valid = false;
    }

    if (!validateNameOrLastName(formData.lastName)) {
      validationErrors.lastName = "Por favor, introduzca un apellido válido.";
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      validationErrors.email = "Por favor, introduzca un email válido.";
      valid = false;
    }

    if (formData.password.length < 8) {
      validationErrors.password = "La contraseña debe tener al menos 8 caracteres.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Las contraseñas no coinciden.";
      valid = false;
    }

    setErrors({
      name: validationErrors.name || "", // Provide a default value of an empty string
      lastName: validationErrors.lastName|| "",
      email: validationErrors.email || "",
      password: validationErrors.password || "",
      confirmPassword: validationErrors.confirmPassword || ""
    });

    if (valid) {
      const data = {
        name: formData.name,
        first_surname: formData.lastName,
        email: formData.email,
        password: formData.password
      };
      const result = await authPost('auth/register/', data);
      console.log("Formulario válido, enviar datos", result);
      
    }
  };

  const handleClick = () => {
    useNavitate('/login')
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.authContainer}>
        <article className={styles.authForm}>
          <h1 className={styles.authTitle}>Registre</h1>
          <h2 className={styles.authSubtitle}>una nueva cuenta</h2>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <section className={styles.dobleInputContainer}>
              <GenericInput
                containerClass={styles.nameContainer}
                inputClass={[styles.authInput, styles.dobleInput, `${montserrat.className} antialiased`].join(' ')}
                type="text"
                name="name"
                placeholder="nombre"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                minLength={3}
                required
              />
              {errors.name && <small className={styles.error}>{errors.name}</small>}
              <GenericInput
                containerClass={styles.lastNameContainer}
                inputClass={[styles.authInput, styles.dobleInput, `${montserrat.className} antialiased`].join(' ')}
                type="text"
                name="lastName"
                placeholder="apellido"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                minLength={3}
                required
              />
              {errors.lastName && <small className={styles.error}>{errors.lastName}</small>}
            </section>
            <GenericInput
              inputClass={[styles.authInput, `${montserrat.className} antialiased`].join(' ')}
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            {errors.email && <small className={styles.error}>{errors.email}</small>}
            <GenericInput
              inputClass={[styles.authInput, `${montserrat.className} antialiased`].join(' ')}
              type="password"
              name="password"
              placeholder="contraseña"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              minLength={8}
              required
            />
            {errors.password && <small className={styles.error}>{errors.password}</small>}
            <GenericInput
              inputClass={[styles.authInput, `${montserrat.className} antialiased`].join(' ')}
              type="password"
              name="confirmPassword"
              placeholder="confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              minLength={8}
              required
            />
            {errors.confirmPassword && <small className={styles.error}>{errors.confirmPassword}</small>}
            <Link className={styles.linkToRegister} href="/login">¿Ya está registrado? Conéctese</Link>
            <button type="submit" className={[styles.registerButton, `${montserrat.className} antialiased`].join(' ')}>REGÍSTRESE</button>
          </form>
        </article>
        <aside className={styles.authInfo}>
          <h3 className={styles.authInfoTitle}>¿Ya está registrado?</h3>
          <p className={styles.authInfoText}>Si ya está registrado inicie sesión para acceder a su cuenta</p>
          <Button className={styles.registerButton} label="INICIE SESIÓN" onClick={handleClick}/>
        </aside>
      </section>
      <Image className={styles.logo} src="/imgs/logoFaro.png" alt="logoFaro.png" width={100} height={100} />
    </main>
  );
}

function useNavitate(arg0: string) {
  throw new Error("Function not implemented.");
}
