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
  totalIngres: number = 0;
  transaccioListIngres: data[];
  totalDespesa: number = 0;
  transaccioListDespesa: data[];

  displayedColumns: string[] = ['description', 'value'];

  constructor(
    public userService: UserService,
    public router: Router,
    private store: Store<AppState>
  ) {
    this.categoryList = new Array<categoria>();
    this.transaccionList = new Array<data>();
    this.transaccioListIngres = new Array<data>();
    this.transaccioListDespesa = new Array<data>();
    this.store.select('user').subscribe((user) => {
      this.user = user.usuario.user;
      if (!user.usuario) {
        this.router.navigateByUrl('/login');
      }
    });
    this.store.select('category').subscribe((category) => {
      this.categoryList = category.categories;
    });
    this.store.select('transaction').subscribe((transaccio) => {
      this.transaccionList = [...transaccio.transactions];
      this.transaccioListIngres = [
        ...this.transaccionList.filter((value) => value.type),
      ];
      this.transaccioListDespesa = [
        ...this.transaccionList.filter((value) => !value.type),
      ];
      this.totalIngres = 0;
      this.transaccioListIngres.forEach((value) => {
        this.totalIngres += value.value;
      });
      this.totalDespesa = 0;
      this.transaccioListDespesa.forEach((value) => {
        this.totalDespesa += value.value;
      });
    });
    this.loadCategories();
    this.loadData();
  }

  loadCategories(): void {
    if (this.user) {
      this.store.dispatch(
        CategoriesAction.getCategoriesbyUID({ UID: this.user.uid })
      );
    }
  }

  loadData(): void {
    console.log(this.user);
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
