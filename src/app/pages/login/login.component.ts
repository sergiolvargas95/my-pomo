import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
})
export class LoginComponent {
  formLogin = this.formBuilder.group({
    email: ['', [ Validators.email, Validators.required ]],
    password: ['', [ Validators.required ]]
  });

  constructor( private formBuilder: FormBuilder, private authService: AuthService ) { }

  ngOnInit() {}

  login() {
    console.log('hello');
    if(this.formLogin.valid) {
      const { email, password } = this.formLogin.value;

      this.authService.login(email, password).subscribe((data:any) => {
        console.log(data);
      }, error => console.log(error));

      // this.authService.prueba().subscribe((data:any) => {
      //   console.log(data);
      // })
    } else {
      this.formLogin.markAllAsTouched();
      console.log('user unlogged');
    }
  }
}
