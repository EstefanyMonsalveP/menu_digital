import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  // Signal opcional para mantener lista de usuarios localmente
  users = signal<User[]>([]);

  constructor(private http: HttpClient) {}

  // Crear un usuario (registro)
  createUser(user: { name: string; email: string; password: string }) {
  return this.http.post(`${this.apiUrl}`, user, { withCredentials: true });
}
}
