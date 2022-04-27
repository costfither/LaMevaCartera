import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as CategoriesAction from '../Categories/actions';
import { categoria } from '../Categories/models/categoria.model';
import * as DataAction from '../data/actions';
import { data } from '../data/models/data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  categoryList: categoria[] = [];
  categoryListIngressos: { category: categoria; value: number }[] = [];
  categoryListDespesses: { category: categoria; value: number }[] = [];

  transaccioList: data[];
  totalIngres: number = 0;
  transaccioListIngres: data[];
  totalDespesa: number = 0;
  transaccioListDespesa: data[];

  rangeDate: FormGroup;

  constructor(public router: Router, private store: Store<AppState>) {
    this.transaccioList = new Array<data>();
    this.transaccioListIngres = new Array<data>();
    this.transaccioListDespesa = new Array<data>();
    this.rangeDate = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    this.store.select('userState').subscribe((user) => {
      user
        ? (this.user = user.usuario?.user)
        : this.router.navigateByUrl('/login');
    });
    this.store.select('categoryState').subscribe((category) => {
      this.categoryList = category?.categories;
    });

    this.store.select('transactionState').subscribe((transaccio) => {
      this.transaccioList = transaccio?.transactions;
      if (transaccio?.transactions) {
        this.transaccionList(transaccio?.transactions);
      }
    });
    this.loadCategories();
    this.loadData();
  }
  eventDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.transaccionList(this.transaccioList);
  }

  private transaccionList(transaccioList: data[]) {
    let transaccioDateRange = [...transaccioList].filter(
      (date) =>
        (this.rangeDate.value.start == null &&
          this.rangeDate.value.end == null) ||
        (new Date(date.publication_date).getTime() >=
          this.rangeDate.value.start &&
          new Date(date.publication_date).getTime() <= this.rangeDate.value.end)
    );
    this.transaccioListIngres = [
      ...transaccioDateRange.filter((value) => value.type === true),
    ];
    this.transaccioListDespesa = [
      ...transaccioDateRange.filter((value) => value.type === false),
    ];
    this.totalIngres = this.totalValues(this.transaccioListIngres);
    this.totalDespesa = this.totalValues(this.transaccioListDespesa);
    this.categoryListIngressos = [
      ...this.createTransaccioList(this.transaccioListIngres),
    ];
    this.categoryListDespesses = [
      ...this.createTransaccioList(this.transaccioListDespesa),
    ];
  }

  private createTransaccioList(
    transaccioList: data[]
  ): { category: categoria; value: number }[] {
    let categoryList = this.categoryList.map((category) => {
      return { category: category, value: 0 };
    });
    transaccioList.forEach((transaccio) => {
      const index = this.createCategoryList(transaccio);
      if (index > -1) {
        categoryList[index].value += transaccio.value;
      }
    });
    return categoryList.filter((category) => category.value !== 0);
  }

  private totalValues(transaccioList: data[]): number {
    let totalTransaccioList = 0;
    transaccioList.forEach((value) => {
      totalTransaccioList += value.value;
    });
    return totalTransaccioList;
  }

  private createCategoryList(transaccio: data): number {
    return this.categoryList.findIndex((category, index) => {
      let idCategory: number = 0;
      if (typeof transaccio.Category == typeof idCategory) {
        idCategory = parseInt(transaccio.Category + '');
      } else {
        idCategory = (transaccio.Category as categoria).idCategory;
      }
      return idCategory == category.idCategory ? index : false;
    });
  }

  loadCategories(): void {
    this.store.dispatch(
      CategoriesAction.getCategoriesbyUID({ UID: this.user?.uid })
    );
  }

  loadData(): void {
    this.store.dispatch(DataAction.getDatabyUID({ UID: this.user?.uid }));
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadData();
  }
}
