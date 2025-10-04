import { Injectable, signal} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs";
import { environment } from "../../environment";

interface LoginResponse{
    token:string;
    userName:string
}

@Injectable({providedIn: 'root'})
export class authService{
     // Signal que mantiene el nombre del usuario
    currentUserName = signal<string>('');


    constructor(private http: HttpClient){}
    //Metodo para inciar la sesion
    //Llama el servicio para validar las credenciales del usuario
    login(email: string, password:string): Observable<{message: string, user: {id: string, name: string}}>{
        return this.http.post<{message: string, user: {id: string, name: string}}>(
            `${environment.apiUrl}`,
            { email, password },
            { withCredentials: true }
        ).pipe(
            tap(response => {
                // Guardar el username en el signal
                this.currentUserName.set(response.user.name);
            })
        );
    }
    //Metodo para cerrar sesion
    //Llama el servicio para eliminar la cookie de sesion
    logout():  Observable<any> {
    return this.http.post(`/logout`, {}, { withCredentials: true })
    .pipe(
        tap(() => this.currentUserName.set('')) // limpiar el signal al logout
    );
  }

  //Llama el servicio para enviar correo de recuperacion de email
  sendRecoveryEmail(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/recover-password`, { email }, { withCredentials: true });
}


  //Llama el servicio para actualizar la contraseña
    resetPassword(token: string, password: string, confirmPassword: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/reset-password`, 
        { token, password, confirmPassword }, 
        { withCredentials: true }
    );
    }

    //Llama el servicio para confirmar la cuenta
    confirmAccount(token: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/confirm-account`, 
        { token }, 
        { withCredentials: true }
    );
    }
}