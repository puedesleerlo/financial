import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private as: AuthService, private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  }
  login() {
    let value = this.loginForm.value
    this.as.login(value.email, value.password)
  }
  loginout() {
    this.as.logout()
  }
  gotoAassa() {
    this.router.navigate(['./forms/aassa'])
  }
  ngOnInit() {
  }

  get isAuth() {
    return this.as.isAuthenticated
  }

}
