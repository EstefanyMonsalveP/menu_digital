import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  // Signal opcional para mantener lista de usuarios localmente
  users = signal<User[]>([]);

  constructor(private http: HttpClient) {}

  // Crear un usuario (registro)
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user, { withCredentials: true });
  }
}
