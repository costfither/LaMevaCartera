import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {}

  login(email: string, password: string) {
    this.userService
      .login(email, password)
      .finally((user?: any) => {
        this.user = user;
        this.route.navigateByUrl('');
      })
      .catch((error) => {});
  }
}
