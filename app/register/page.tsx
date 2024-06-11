// pages/register.js

'use client'

import { useContext, useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/buttons/button";
import { montserrat } from "../ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/app/context/auth";
import GenericInput from '../../components/shared/GenericInput';
import { authPost } from "@/utils/authApi";
import { useRouter } from "next/navigation";

import { validateEmail, validateNameOrLastName } from "@/utils/validateData";
import AuthFormSection from "@/components/shared/AuthFormSection";
import AuthInfoAside from "@/components/shared/AuthInfoAside";
import FormHeader from "@/components/shared/FormHeader";



const Register = () => {
  const router = useRouter();
  const { setToken } = useContext(AuthContext);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const validationErrors: ValidationErrors = {};

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

    setErrors(validationErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      name: formData.name,
      first_surname: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    try {
      const result = await authPost('auth/register', data);
      setToken(result.access_token);
      router.push('/feed');
    } catch (e: any) {
      if (e.response?.data?.message === "User already exists") {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: "El email está en uso.",
        }));
      }
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.authContainer}>
        <article className={styles.authForm}>
          <FormHeader title="Registre" subtitle="una nueva cuenta" styles={styles} />
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <section className={styles.dobleInputContainer}>
              <AuthFormSection
                type="text"
                name="name"
                placeholder="nombre"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                minLength={3}
                required
                styles={styles}
                montserratClassName={montserrat.className}
                hasOutsideDiv={true}
              />
              <AuthFormSection
                type="text"
                name="lastName"
                placeholder="apellido"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                minLength={3}
                required
                styles={styles}
                montserratClassName={montserrat.className}
                hasOutsideDiv={true}
              />
            </section>
            <AuthFormSection
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              styles={styles}
              montserratClassName={montserrat.className}
              hasOutsideDiv={false}
            />
            <AuthFormSection
              type="password"
              name="password"
              placeholder="contraseña"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              minLength={8}
              required
              styles={styles}
              montserratClassName={montserrat.className}
              hasOutsideDiv={false}
            />
            <AuthFormSection
              type="password"
              name="confirmPassword"
              placeholder="confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              minLength={8}
              required
              styles={styles}
              montserratClassName={montserrat.className}
              hasOutsideDiv={false}
            />
            <Link className={styles.linkToRegister} href="/login">¿Ya está registrado? Conéctese</Link>
            <button type="submit" className={[styles.registerButton, `${montserrat.className} antialiased`].join(' ')}>REGÍSTRESE</button>
          </form>
        </article>
        <AuthInfoAside 
          headerMessage="¿Ya está registrado?"
          text="Si ya está registrado inicie sesión para acceder a su cuenta"
          buttonText="INICIE SESION"
          buttonLink="/login"
          styles={styles} 
        />
      </section>
      <Image className={styles.logo} src="/imgs/logoFaro.png" alt="logoFaro.png" width={100} height={100} />
    </main>
  );
};

export default Register;
