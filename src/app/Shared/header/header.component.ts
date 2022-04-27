import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'firebase/auth';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../User/actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private user: User | null | undefined;
  loginUser: boolean = false;

  constructor(private route: Router, private store: Store<AppState>) {
    this.store.select('userState').subscribe((user) => {
      if (user) {
        if (user.usuario) {
          this.user = user.usuario;
          this.loginUser = true;
        } else {
          this.loginUser = false;
        }
      }
    });
  }

  ngOnInit(): void {}

  goHome() {
    this.route.navigateByUrl('');
  }

  goLogin() {
    this.route.navigateByUrl('login');
  }

  goCategoryList() {
    this.route.navigateByUrl('category');
  }
  goDataList() {
    this.route.navigateByUrl('data');
  }

  logout() {
    this.store.dispatch(UserAction.logout());
  }
}
