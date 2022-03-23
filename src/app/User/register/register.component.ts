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
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User('', '', '', 0, '', '', '');
  registerForm: FormGroup;
  email: FormControl;
  pass: FormControl;

  constructor(
    private store: Store<AppState>,
    public userService: UserService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.email = new FormControl(this.user.email, [Validators.required]);
    this.pass = new FormControl(this.user.password, [Validators.required]);
    this.registerForm = this.formBuilder.group({
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
