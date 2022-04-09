import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  filterDataList: { transaccio: data; selected: boolean }[];
  checkList: boolean[];
  categoryList: categoria[];

  selectAll: boolean = false;

  private user: User | null | undefined;

  rangeDate: FormGroup;

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
    this.filterDataList = new Array<{ transaccio: data; selected: boolean }>();

    this.checkList = new Array<boolean>();

    this.sortedData = new Array<data>();

    this.categoryList = new Array<categoria>();
    this.callCategories();
    this.callData();

    this.rangeDate = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    this.store.select('userState').subscribe((userState) => {
      this.user = userState?.usuario;
    });
    this.store.select('categoryState').subscribe((categoriesState) => {
      this.categoryList = categoriesState?.categories;
    });
    this.store.select('transactionState').subscribe((transactionState) => {
      let datas = this.loadData(transactionState?.transactions);
      this.filterDataList = this.filterLoadData(datas).map((value) => {
        return { transaccio: value, selected: false };
      });
      this.orderData();
    });
  }

  loadData(transactions: data[]) {
    return transactions.map((value) => {
      //si es un tipus numero
      if (typeof value.Category == typeof 0) {
        value.Category = this.categoryList.find(
          (cat) => cat.idCategory == (value.Category as unknown as number)
        ) as categoria;
      }
      return value;
    }) as data[];
  }

  orderData() {
    this.dataList.sort(function (a, b) {
      return new Date(a.publication_date).getTime() <
        new Date(b.publication_date).getTime()
        ? 1
        : -1;
    });
  }

  eventDate() {
    this.filterDataList = this.filterLoadData(this.dataList).map((value) => {
      return { transaccio: value, selected: false };
    });
  }

  filterLoadData(transaccions: data[]): data[] {
    return [...transaccions].filter(
      (date) =>
        (this.rangeDate.value.start == null &&
          this.rangeDate.value.end == null) ||
        (new Date(date.publication_date).getTime() >=
          this.rangeDate.value.start &&
          new Date(date.publication_date).getTime() <= this.rangeDate.value.end)
    );
  }

  callCategories(): void {
    if (this.user) {
      this.store.dispatch(
        CategoriesAction.getCategoriesbyUID({ UID: this.user.uid })
      );
    }
  }

  callData(): void {
    if (this.user) {
      this.store.dispatch(DataAction.getDatabyUID({ UID: this.user?.uid }));
    }
  }
  ngOnInit(): void {
    this.callCategories();
    this.callData();
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
    console.log(ob);
    this.filterDataList = this.filterDataList.map((data) => {
      data.selected = ob;
      return data;
    });
    console.log(this.filterDataList);
  }

  checkElement(transaccio: IData) {
    this.filterDataList = this.filterDataList.map((data) => {
      if (data.transaccio == transaccio) {
        data.selected = !data.selected;
      }
      return data;
    });
  }

  deleteSelect() {
    this.filterDataList.forEach((data) => {
      if (data.selected) {
        this.deleteData(data.transaccio);
      }
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
