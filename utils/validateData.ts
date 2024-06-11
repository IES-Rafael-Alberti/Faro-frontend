export const validateNameOrLastName = (name: string) => /^[a-zA-ZáÁéÉíÍóÓúÚ\s]+$/.test(name);

export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
