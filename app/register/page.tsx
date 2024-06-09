// pages/register.js

'use client'

import { useContext, useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/buttons/button";
import { montserrat } from "../ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/app/context/auth"
import GenericInput from '../../components/shared/GenericInput'
import { submitData } from "../../utils/submitData";
import { authPost } from "@/utils/authApi";
import { useRouter } from "next/navigation";


export default function Register () {
  const router = useRouter();

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
  const { setToken } = useContext(AuthContext);

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
      name: validationErrors.name || "", 
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
      }
      try {
        const result = await authPost('auth/register', data);
        setToken(result.access_token);
        router.push('/login');
      } catch (e : any) {
        if (e.response && e.response.data && e.response.data.message === "User already exists") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "El email está en uso.",
          }));
        }
      }
    }
  };


  return (
    <main className={styles.wrapper}>
      <section className={styles.authContainer}>
        <article className={styles.authForm}>
          <h1 className={styles.authTitle}>Registre</h1>
          <h2 className={styles.authSubtitle}>una nueva cuenta</h2>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <section className={styles.dobleInputContainer}>
              <div className={styles.w48}>
                <GenericInput
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
              </div>
              <div className={styles.w48}>
                <GenericInput
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
              </div>
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
          <Button className={styles.registerButton} text="INICIE SESIÓN" href="/login" />
        </aside>
      </section>
      <Image className={styles.logo} src="/imgs/logoFaro.png" alt="logoFaro.png" width={100} height={100} />
    </main>
  );
}
