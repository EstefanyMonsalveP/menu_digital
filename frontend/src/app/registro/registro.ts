import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {}

  register() {
    //Valida que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    //Crea el nuevo usuario
    this.userService.createUser({
    name: this.name,
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {
      alert('Usuario creado correctamente. Ahora inicia sesión.');
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    },
    error: err => console.error(err)
  });
}
}
