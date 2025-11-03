import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
 name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errors = signal<string[]>([]);
  successMessage = signal<string>('');

  constructor(private userService: UserService) {}

  // Validación de contraseña
  validatePassword(password: string, confirmPassword: string): string[] {
    const errors: string[] = [];

    if (password.length < 8) errors.push("La contraseña debe tener al menos 8 caracteres");
    if (!/[a-zA-Z]/.test(password)) errors.push("Debe contener al menos una letra");
    if (!/\d/.test(password)) errors.push("Debe contener al menos un número");
    if (!/[!@#$%^&*(),.?":{}|<>+-]/.test(password)) errors.push("Debe contener un símbolo");
    if (password !== confirmPassword) errors.push("Las contraseñas no coinciden");

    return errors;
  }

  register() {
    const validationErrors = this.validatePassword(this.password, this.confirmPassword);

    if (validationErrors.length > 0) {
      this.errors.set(validationErrors);
      return;
    }

    this.errors.set([]); // limpiar errores

    // Llamar al backend para crear usuario
    this.userService.createUser({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.successMessage.set((res as any).message);
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      },
      error: err => {console.error(err);
      const backendMessage = err?.error?.message || err?.message || 'Error desconocido al registrar usuario';
      this.errors.set([backendMessage]);
      this.successMessage.set('');
      }
    });
  }
}
