import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // name = 'Angular ' + VERSION.major;

  constructor(
    private userService: UserService,
    private _router: Router) {}
    
  incorrectLogin = false;
  checkingLogin = false;
  invalidForm = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',  Validators.required)
  });

  ngOnInit(): void {
    
  }

  findInvalidLoginFields = () => {
    const invalid = [];
    const loginControls = this.loginForm.controls;

    for (const controlName in loginControls) {
      if (loginControls[controlName].invalid) {
        invalid.push(controlName);
      }
    }
    this.invalidForm = (invalid.length > 0);
  }

  checkLogin = () => {

    this.userService.getUserData().subscribe((userData: any) => {

      this.checkingLogin = true;

      // set a timeout for fun
      setTimeout(() => {
        this.checkingLogin = false;
        if (userData[0].username === this.username.value && userData[0].password === this.password.value) {
          this._router.navigate(['trips']);
        } else {
          this.incorrectLogin = true;
          this.username.markAsPristine();
          this.username.markAsUntouched();
        }
      }, 1000);
    });
  }

  onSubmit = () => {
    this.findInvalidLoginFields();
    if (!this.invalidForm) {
      this.checkLogin();
    }
  }

  get username(): FormControl { return this.loginForm.controls.username as FormControl; }
  get password(): FormControl { return this.loginForm.controls.password as FormControl; }
}
