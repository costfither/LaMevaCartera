import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { UserService } from '../User/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(
    public userService: UserService,
    public router: Router,
    private store: Store<AppState>
  ) {
    this.store.select('user').subscribe((user) => {
      if (!user.usuario) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnInit(): void {}

  goLlistaCategoria() {
    this.router.navigateByUrl('/category');
  }

  goLlistaDades() {
    this.router.navigateByUrl('/data');
  }
}
