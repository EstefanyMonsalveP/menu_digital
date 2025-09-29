import { Component, signal } from '@angular/core';
import {Router} from '@angular/router';
import { authService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  name = signal<string | null>(null); 

  constructor(private authService: authService, private router: Router){}

  login(){
    this.authService.login(this.email,this.password).subscribe({
      next: (res) => {
        this.name.set(res.user.name);  // Guardar el nombre del usuario
        this.router.navigate(['/crud']);
      },
      error: (err) =>{
        this.errorMessage = err.error?.message || 'Error al iniciar sesión';
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.name.set(null);           // limpiar el nombre
      this.router.navigate(['/login']);  // redirigir al login
    });
  }
}
