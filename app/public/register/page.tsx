'use client';
import { useContext, useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/buttons/button";
import { montserrat } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/app/context/auth"
import { authPost } from "@/utils/authApi";
import { useRouter } from "next/navigation";
import FormHeader from "@/components/shared/FormHeader";
import AuthFormSection from "@/components/shared/AuthFormSection";
import toast from "react-hot-toast";

/**
 * Component for user registration.
 * Allows users to register by providing necessary information.
 */
const Register = () => {
  // Initialize useRouter hook from Next.js
  const router = useRouter();

  // Define state variables for form data and errors
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

  // Access the authentication context
  const { setToken } = useContext(AuthContext);

  /**
   * Function to handle form input changes.
   * @param {Event} e - Event object representing the form input change event.
   */
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  /**
   * Function to validate email format.
   * @param {string} email - Email address to validate.
   * @returns {boolean} - Indicates whether the email is valid.
   */
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Function to validate name or last name format.
   * @param {string} name - Name or last name to validate.
   * @returns {boolean} - Indicates whether the name or last name is valid.
   */
  const validateNameOrLastName = (name: string) => {
    const nameRegex = /^[a-zA-ZáÁéÉíÍóÓúÚ\s]+$/;
    return nameRegex.test(name);
  };

  /**
   * Function to handle form submission.
   * @param {Event} e - Event object representing the form submission event.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let valid = true;
    let validationErrors: { 
      name?: string, 
      lastName?: string 
      email?: string,
      password?: string,
      confirmPassword?: string
    } = {};

    // Perform validation checks on form data
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

    // Update errors state with validation results
    setErrors({
      name: validationErrors.name || "", 
      lastName: validationErrors.lastName || "",
      email: validationErrors.email || "",
      password: validationErrors.password || "",
      confirmPassword: validationErrors.confirmPassword || ""
    });

    // If form data is valid, submit it
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
        router.push('/public/login');
        toast.success('Registro realizado con éxito.')

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
            {errors.confirmPassword && <small className={styles.error}>{errors.confirmPassword}</small>}
            <Link className={styles.linkToRegister} href="/public/login">¿Ya está registrado? Conéctese</Link>
            <button type="submit" className={[styles.registerButton, `${montserrat.className} antialiased`].join(' ')}>REGÍSTRESE</button>
          </form>
        </article>
        <aside className={styles.authInfo}>
          <h3 className={styles.authInfoTitle}>¿Ya está registrado?</h3>
          <p className={styles.authInfoText}>Si ya está registrado inicie sesión para acceder a su cuenta</p>
          <Button className={styles.registerButton} text="INICIE SESIÓN" href="/public/login" />
        </aside>
      </section>
      <Image className={styles.logo} src="/imgs/logoFaro.png" alt="logoFaro.png" width={100} height={100} />
    </main>
  );
};

export default Register;
