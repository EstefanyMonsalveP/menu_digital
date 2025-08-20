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
  step = signal<'email' | 'reset'>('email'); // controla si estamos en email o reset
  errors = signal<string[]>([]);
  successMessage = signal('');

  constructor(private authService: authService, private router: Router) {}

  
  //Enviar email
  sendRecoveryEmail() {
    console.log("Email que voy a enviar:", this.email);
    this.authService.sendRecoveryEmail(this.email).subscribe({
      next: () =>{
        this.successMessage.set('Correo enviado. Revise su bandeja');
        this.step.set('reset')
      },
      error: err => this.errors.set([err.error?.message || 'Error enviando correo'])
    });
  }
}
