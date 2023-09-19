import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public token:any;
  public isAuthenticated:boolean | undefined = false;

  constructor( public _authService: AuthService, private router:Router ) {
    this.token = localStorage.setItem('token', '');
  }

  ngOnInit() {
    this._authService.isAuthenticated().subscribe(data => {
      this.isAuthenticated = data.isLogged;
    });

  }

  logOut() {
    this.token = localStorage.getItem('token');
    this._authService.logOut(this.token).subscribe((data:any) => {
      this._authService.setCurrentUser({});
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }

  logIn(){
    this.router.navigate(['/login']);
  }
}
