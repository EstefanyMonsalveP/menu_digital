import { Component , signal} from '@angular/core';
import { authService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

   email = '';
  password = '';
  confirmPassword = '';
  token = '';

  step = signal<'email' | 'reset'>('email'); // controla si estamos en email o reset
  errors = signal<string[]>([]);
  successMessage = signal('');

  constructor(private authService: authService, private router: Router) {}

  //Enviar email
  sendRecoveryEmail() {
    this.authService.sendRecoveryEmail(this.email).subscribe({
      next: () =>{
        this.successMessage.set('Usuario creado correctamente. Ahora inicia sesión.');
        this.step.set('reset')
      },
      error: err => this.errors.set([err.error?.message || 'Error enviando correo'])
    });
  }
}
