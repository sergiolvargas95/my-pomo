import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  //styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public loading = false;

  formRegister = this.formBuilder.group({
    name: ['', [ Validators.required ]],
    email:['',[Validators.email, Validators.required]],
    password: ['', [Validators.required ]]
  });

  constructor( private formBuilder: FormBuilder, private _authService: AuthService, private router:Router, private toastr: ToastrService ) {}

  register() {
    if(this.formRegister.valid) {
      const { name, email, password } = this.formRegister.value;
      this.formRegister.reset();
      this.loading = true;
      this._authService.register(name, email, password).subscribe((data:any) => {
        if(data.status === true) {
          this.toastr.success(JSON.stringify(data.message), JSON.stringify(data.code), {
            timeOut: 2000,
            progressBar:true,
          });
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
          })
        }
      });
    }
  }

  OpenLogin() {
    this.router.navigate(['/login'])
  }
}
