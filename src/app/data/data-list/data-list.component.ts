import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'firebase/auth';
import { AppState } from 'src/app/app.reducers';
import { categoria } from 'src/app/Categories/models/categoria.model';
import * as CategoriesAction from '../../Categories/actions';
import * as DataAction from '../actions';
import { data, IData } from '../models/data.model';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css'],
})
export class DataListComponent implements OnInit {
  dataList: data[];
  categoryList: categoria[];

  private user: User | null | undefined;

  constructor(public router: Router, private store: Store<AppState>) {
    this.dataList = new Array<data>();
    this.categoryList = new Array<categoria>();
    this.loadCategories();
    this.loadData();

    this.store.select('user').subscribe((userState) => {
      this.user = userState.usuario;
    });
    this.store.select('category').subscribe((categoriesState) => {
      this.categoryList = categoriesState.categories;
    });
    this.store.select('transaction').subscribe((transactionState) => {
      if (transactionState.transactions) {
        this.dataList = transactionState.transactions;
        transactionState.transactions.forEach((value, index) => {
          if (value.CategoryList) {
            value.CategoryList.forEach((category, catIndex) => {
              this.dataList[index].CategoryList[catIndex] =
                this.categoryList.find(
                  (cat) => cat.idCategory === (category as unknown as number)
                ) as categoria;
            });
          }
        });
      }
    });
    this.loadCategories();
    this.loadData();
  }

  private loadCategories(): void {
    if (this.user) {
      this.store.dispatch(
        CategoriesAction.getCategoriesbyUID({ UID: this.user.uid })
      );
    }
  }

  private loadData(): void {
    if (this.user) {
      this.store.dispatch(DataAction.getDatabyUID({ UID: this.user.uid }));
    }
  }
  ngOnInit(): void {
    this.loadCategories();
    this.loadData();
  }

  createData(): void {
    this.router.navigateByUrl('data/add');
  }

  updateData(id: string | undefined): void {
    this.router.navigateByUrl('data/' + id);
  }

  deleteData(transaccio: IData): void {
    let result = confirm(
      'Confirmar eliminar transaccio amb identificador: ' + transaccio.id + ' .'
    );
    if (result) {
      this.store.dispatch(DataAction.deleteData({ transaction: transaccio }));
    }
  }
}
