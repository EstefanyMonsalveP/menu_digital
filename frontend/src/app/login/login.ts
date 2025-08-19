import { Component, signal } from '@angular/core';
import {Router} from '@angular/router';
import { authService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userName = signal<string | null>(null); 

  constructor(private authService: authService, private router: Router){}

  login(){
    this.authService.login(this.email,this.password).subscribe({
      next: (res) => {
        this.userName.set(res.userName);
        this.router.navigate(['/crud']);
      },
      error: (err) =>{
        this.errorMessage = 'Usuario o contraseña incorrecta'
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.userName.set(null);           // limpiar el nombre
      this.router.navigate(['/login']);  // redirigir al login
    });
  }
}
