import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private as: AuthService) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  }
  login() {
    console.log(this.loginForm);
    let value = this.loginForm.value
    this.as.login(value.email, value.password)
  }
  loginout() {
    this.as.logout()
  }
  ngOnInit() {
  }

  get isAuth() {
    return this.as.isAuthenticated
  }

}
