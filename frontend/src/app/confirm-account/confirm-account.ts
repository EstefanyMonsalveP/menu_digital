import { Component } from '@angular/core';
import { authService } from '../services/auth.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirm-account',
  imports: [],
  templateUrl: './confirm-account.html',
  styleUrl: './confirm-account.css'
})
export class ConfirmAccount {
  token = '';
  successMessage = '';
  errorMessage = '';

  constructor(private route: ActivatedRoute, private authService: authService, private router: Router){}
  ngOnInit() {
      // Tomamos el token de la URL
      this.route.queryParams.subscribe(params => {
        this.token = params['token'] || '';
      });
    }

    if(this.token) {
      this.confirmAccount(this.token);
    }

    //Validar el token, activar la cuenta y enviar el mensaje de éxito o error
    confirmAccount(token: string) {
      this.authService.confirmAccount(token).subscribe({
        next: (res:any) => {
          this.successMessage = res.message || 'Cuenta confirmada correctamente. Redirigiendo al login...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al confirmar la cuenta';
          this.successMessage = ''
        } 
    })
  }
}
