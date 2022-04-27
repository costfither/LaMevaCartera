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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  passwordHide = true;

  registerForm: FormGroup;
  email: FormControl;
  pass: FormControl;
  user: User = new User('', '', '', 0, '', '', '');

  constructor(
    private store: Store<AppState>,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);
    this.pass = new FormControl(this.user.password, [Validators.required]);
    this.registerForm = this.formBuilder.group({
      email: this.email,
      pass: this.pass,
    });
    this.store.select('userState').subscribe((user) => {
      if (user.usuario) {
        this.route.navigateByUrl('');
      }
    });
  }

  ngOnInit(): void {}

  registrar() {
    this.user.email = this.email.value;
    this.user.password = this.pass.value;
    this.store.dispatch(
      UserAction.register({
        email: this.user.email,
        password: this.user.password,
      })
    );
  }

  goLogin() {
    this.route.navigateByUrl('/login');
  }
}
