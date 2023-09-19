import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
})
export class LoginComponent {
  public loading = false;

  formLogin = this.formBuilder.group({
    email: ['', [ Validators.email, Validators.required ]],
    password: ['', [ Validators.required ]]
  });

  constructor( private formBuilder: FormBuilder, private _authService: AuthService, private router:Router ) { }

  ngOnInit() {}

  login() {
    if(this.formLogin.valid) {
      const { email, password } = this.formLogin.value;
      this.formLogin.reset();
      this.loading = true;
      this._authService.login(email, password).subscribe((response:any) => {
        if(response.status === true){
          localStorage.setItem('token', response.token);
          this.loading = false;
          this._authService.setCurrentUser(response.data);
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        this.loading = false;
          this.router.navigate(['/login']);
      });
    } else {
      this.formLogin.markAllAsTouched();
    }
  }
}
