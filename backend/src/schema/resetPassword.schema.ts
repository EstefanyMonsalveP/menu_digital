import { z } from 'zod';

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres") 
      .regex(/[a-zA-Z]/, "Debe al menos una letra")
      .regex(/\d/, "Debe contener al menos un número")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener un símbolo"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], // Marca el error en el campo confirmPassword
});
