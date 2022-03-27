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
  sortedData: data[];
  dataList: data[];
  checkList: boolean[];
  categoryList: categoria[];
  selectData: data[];

  selectAll: boolean = false;

  private user: User | null | undefined;

  displayedColumns: string[] = [
    'checkbox',
    'description',
    'publication_date',
    'CategoryList',
    'value',
    'action',
  ];

  constructor(public router: Router, private store: Store<AppState>) {
    this.dataList = new Array<data>();
    this.checkList = new Array<boolean>();

    this.sortedData = new Array<data>();
    this.selectData = new Array<data>();

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
        this.sortedData = this.dataList;
        const basicDataList = [...transactionState.transactions];
        this.dataList = [...basicDataList];

        basicDataList.forEach((value, index) => {
          if (value.CategoryList) {
            let categoryList: categoria[];
            categoryList = new Array<categoria>();
            value.CategoryList.forEach((category, catIndex) => {
              const type = 0;
              if (typeof category == typeof type) {
                const result = this.categoryList.find(
                  (cat) => cat.idCategory == (category as unknown as number)
                ) as categoria;
                categoryList.push(result);
              } else {
                categoryList.push(category);
              }
            });
            this.dataList[index].CategoryList = categoryList;
          }
        });
      }
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

  updateData(id: string): void {
    if (this.user) {
      this.store.dispatch(
        DataAction.getDatabyID({ idData: id, UID: this.user.uid })
      );

      this.router.navigateByUrl('data/' + id);
    }
  }

  checkAll(ob: boolean) {
    if (ob) {
      this.selectData = this.dataList;
    } else {
      this.selectData = new Array<data>();
    }
  }

  checkElement(transaccio: IData) {
    this.selectData.push(transaccio);
  }

  deleteSelect(transaccions: IData[]) {
    transaccions.forEach((transaccio) => {
      this.deleteData(transaccio);
    });
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
