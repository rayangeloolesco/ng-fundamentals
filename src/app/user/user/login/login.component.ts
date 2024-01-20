import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: any;
  password: any;
  mouseoverLogin: boolean = false;
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any) {
    this.authService
      .loginUser(formValues.userName, formValues.password)
      .subscribe((resp) => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
