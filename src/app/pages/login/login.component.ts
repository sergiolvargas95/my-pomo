import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
})
export class LoginComponent {
  public loading = false;
  public submitted = false;

  formLogin = this.formBuilder.group({
    email: ['', [ Validators.email, Validators.required ]],
    password: ['', [ Validators.required, Validators.minLength(9) ]]
  });

  constructor( private formBuilder: FormBuilder, private _authService: AuthService, private router:Router, private toastr: ToastrService ) { }

  ngOnInit() {}

  login() {
    this.submitted = true;
    if(this.formLogin.valid) {
      const { email, password } = this.formLogin.value;
      this.formLogin.reset();
      this.loading = true;

      this._authService.login(email, password).subscribe((response:any) => {
        if(response.status === true){
          localStorage.setItem('token', response.token);
          this.loading = false;
          this._authService.setCurrentUser(response.data);
          //adding toast notification
          this.toastr.success(JSON.stringify(response.message), JSON.stringify(response.code), {
            timeOut: 2000,
            progressBar:true,
          });
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        console.log(error);
        this.loading = false;
        this.toastr.error(JSON.stringify(error.error.errors[0]), JSON.stringify(error.code), {
          timeOut: 2000,
          progressBar:true,
        });
        this.router.navigate(['/login']);
      });

    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  OpenRegister() {
    this.router.navigate(['/register']);
  }

  get form() {
    return this.formLogin.controls;
  }
}
