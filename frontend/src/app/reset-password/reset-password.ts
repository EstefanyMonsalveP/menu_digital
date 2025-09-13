import { Component,signal } from '@angular/core';
import { authService } from '../services/auth.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  password = '';
  confirmPassword = '';
  token = '';
  errors = signal<string[]>([]);
  successMessage = signal('');

  constructor(private route: ActivatedRoute, private authService: authService, private router: Router){}

   ngOnInit() {
    // Tomamos el token de la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  //Recuperar la contraseña
  resetPassword() {
    const validationErrors = this.validatePassword(this.password, this.confirmPassword);
    if (validationErrors.length > 0) {
      this.errors.set(validationErrors);
      return;
    }

    this.authService.resetPassword(this.token, this.password, this.confirmPassword).subscribe({
      next: () => {
        this.successMessage.set('Contraseña actualizada correctamente. Redirigiendo al login...');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => this.errors.set([err.error?.message || 'Error al actualizar la contraseña'])
    });
  }

  validatePassword(password: string, confirmPassword: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) errors.push('La contraseña debe tener al menos 8 caracteres');
    if (!/[a-zA-Z]/.test(password)) errors.push('Debe contener al menos una letra');
    if (!/\d/.test(password)) errors.push('Debe contener al menos un número');
    if (!/[!@#$%^&*(),.?":{}|<>+-]/.test(password)) errors.push('Debe contener un símbolo');
    if (password !== confirmPassword) errors.push('Las contraseñas no coinciden');
    return errors;
  }

}
