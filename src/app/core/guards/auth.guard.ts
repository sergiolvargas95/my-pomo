import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private token:any;

  constructor(private _authService: AuthService, private router: Router) { }
  canActivate():any {
    this.token = localStorage.getItem('token');
    if(this.token) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
