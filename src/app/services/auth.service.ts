import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient ) { }

  login(email: any, password: any) {
    const headers = new HttpHeaders();
    const body: FormData = new FormData;

    headers.append('Content-Type', 'application/form-data');
    body.append('email', email);
    body.append('password', password);
    //console.log(this.http.post('http://127.0.0.1:8000/api/login', body, { headers }));

    return this.http.post('http://127.0.0.1:8000/api/login', body, { headers });
  }

  prueba(){
    return this.http.get('http://127.0.0.1:8000/api/getprueba');
  }
}
