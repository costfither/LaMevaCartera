import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as CategoriesAction from '../Categories/actions';
import { categoria } from '../Categories/models/categoria.model';
import * as DataAction from '../data/actions';
import { data } from '../data/models/data.model';
import { UserService } from '../User/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  transaccionList: data[];
  categoryList: categoria[];
  constructor(
    public userService: UserService,
    public router: Router,
    private store: Store<AppState>
  ) {
    this.categoryList = new Array<categoria>();
    this.transaccionList = new Array<data>();

    this.store.select('user').subscribe((user) => {
      if (!user.usuario) {
        this.router.navigateByUrl('/login');
      }
    });
    this.store.select('category').subscribe((category) => {
      this.categoryList = category.categories;
    });
    this.store.select('transaction').subscribe((transaccio) => {
      this.transaccionList = transaccio.transactions;
    });
  }

  loadCategories(): void {
    if (this.user) {
      this.store.dispatch(
        CategoriesAction.getCategoriesbyUID({ UID: this.user.uid })
      );
    }
  }

  loadData(): void {
    if (this.user) {
      this.store.dispatch(DataAction.getDatabyUID({ UID: this.user.uid }));
    }
  }
  ngOnInit(): void {
    this.loadCategories();
    this.loadData();
  }

  goLlistaCategoria() {
    this.router.navigateByUrl('/category');
  }

  goLlistaDades() {
    this.router.navigateByUrl('/data');
  }
}
