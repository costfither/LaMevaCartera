import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../actions';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  passwordHide = true;
  userForm: FormGroup;
  email: FormControl;
  pass: FormControl;
  user: User = new User('', '', '', 0, '', '', '');

  constructor(
    private store: Store<AppState>,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.email = new FormControl(this.user.email, [Validators.required]);
    this.pass = new FormControl(this.user.password, [Validators.required]);
    this.email.setValue(this.user.email);
    this.pass.setValue(this.user.password);
    this.userForm = this.formBuilder.group({
      email: this.email,
      pass: this.pass,
    });
    this.store.select('user').subscribe((user) => {
      if (user.usuario) {
        this.route.navigateByUrl('');
      }
    });
  }

  ngOnInit(): void {}

  login() {
    if (!this.userForm.valid) {
      return;
    }
    const email = this.email.value;
    const password = this.pass.value;
    this.store.dispatch(UserAction.login({ email, password }));
  }

  register(): void {
    this.route.navigateByUrl('/register');
  }
}
