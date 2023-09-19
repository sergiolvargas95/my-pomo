import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../core/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Declaro mi variable como Observable
  private _userSubject:BehaviorSubject<User> = new BehaviorSubject<User>({});

  constructor( private http:HttpClient ) {
  }

  login(email: any, password: any) {
    const headers = new HttpHeaders();
    const body: FormData = new FormData;

    headers.append('Content-Type', 'application/form-data');
    body.append('email', email);
    body.append('password', password);

    return this.http.post('http://127.0.0.1:8000/api/login', body, { headers });
  }

  logOut(token:string) {
    let headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + token)
          .set('Content-Type', 'application/json');

    return this.http.post('http://127.0.0.1:8000/api/logout', null, { headers });
  }

  setCurrentUser(user: User) :void{
    this._userSubject.next(user);
  }

  isAuthenticated():Observable<User> {
    return this._userSubject.asObservable();
  }
}
