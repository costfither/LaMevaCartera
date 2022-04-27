import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'firebase/auth';
import { AppState } from 'src/app/app.reducers';
import { categoria } from 'src/app/Categories/models/categoria.model';
import * as CategoriesAction from '../../Categories/actions';
import * as DataAction from '../actions';
import { data } from '../models/data.model';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-data-add',
  templateUrl: './data-add.component.html',
  styleUrls: ['./data-add.component.css'],
})
export class DataAddComponent implements OnInit {
  transaccio: data;

  description: FormControl;
  type: FormControl;
  category: FormControl;
  value: FormControl;
  publication_date: FormControl;
  dataForm: FormGroup;

  isValidForm: boolean | null;

  isUpdateMode: boolean;
  private transaccionId: string | null;
  private transaccionIdData: number;
  categoriesList!: categoria[];

  private user: User | null | undefined;
  userCategoriesIDs!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isValidForm = null;
    this.transaccionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.transaccio = new data();
    this.isUpdateMode = false;
    this.transaccionIdData = 0;

    this.description = new FormControl(this.transaccio.description, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.type = new FormControl(this.transaccio.type);
    this.value = new FormControl(this.transaccio.value, [
      Validators.required,
      Validators.min(0),
    ]);
    this.category = new FormControl(this.transaccio.Category);
    this.publication_date = new FormControl(this.transaccio.publication_date, [
      Validators.required,
    ]);

    this.dataForm = this.formBuilder.group({
      description: this.description,
      type: this.type,
      value: this.value,
      Category: this.category,
      publication_date: this.publication_date,
    });
    this.store.select('userState').subscribe((user) => {
      this.user = user?.usuario;
    });
    this.store.select('categoryState').subscribe((category) => {
      this.categoriesList = category?.categories;
    });
    this.store.select('transactionState').subscribe((transaccioState) => {
      if (transaccioState?.transaction) {
        this.transaccio = transaccioState.transaction;
        this.transaccionIdData = this.transaccio.idData;
        if (this.transaccio.Category) {
          this.userCategoriesIDs = (
            this.transaccio.Category as categoria
          ).idCategory;
          this.category.setValue(this.transaccio.Category);
          this.description.setValue(this.transaccio.description);
          this.type.setValue(this.transaccio.type);
          this.value.setValue(this.transaccio.value);
          this.publication_date.setValue(this.transaccio.publication_date);
        }
      }
    });
  }

  private loadTransaccion(): void {
    if (this.transaccionId && this.user?.uid) {
      this.store.dispatch(
        DataAction.getDatabyID({
          idData: this.transaccionId,
          UID: this.user?.uid,
        })
      );
    }
  }

  private loadCategories(): void {
    if (this.user?.uid) {
      this.store.dispatch(
        CategoriesAction.getCategoriesbyUID({ UID: this.user?.uid })
      );
    }
  }

  ngOnInit(): void {
    this.loadCategories();
    if (this.transaccionId && this.user?.uid) {
      this.isUpdateMode = true;
      this.loadTransaccion();
    } else {
      this.dataForm.reset();
      this.transaccionIdData = this.transaccio.idData;
      this.publication_date.setValue(
        formatDate(this.transaccio.publication_date, 'yyyy-MM-dd', 'en')
      );
    }
  }

  private editTransaccio(): void {
    if (this.transaccionId) {
      if (this.user?.uid) {
        this.transaccio.UID = this.user?.uid;
        this.transaccio.id = this.transaccionId;
        this.transaccio.Category = this.category.value;
        this.store.dispatch(
          DataAction.updateData({
            id: this.transaccionId,
            transaction: this.transaccio,
          })
        );
        this.goListData();
      }
    }
  }

  private createTransaccio(): void {
    if (this.user?.uid) {
      this.transaccio.UID = this.user?.uid;
      this.transaccio.idData = this.transaccionIdData;
      this.store.dispatch(
        DataAction.createData({ transaction: this.transaccio })
      );
      this.goListData();
    }
  }

  saveData(): void {
    this.isValidForm = false;
    if (this.dataForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.transaccio = this.dataForm.value;
    this.transaccio.idData = this.transaccionIdData;
    if (this.isUpdateMode) {
      this.editTransaccio();
    } else {
      this.createTransaccio();
    }
  }

  goListData() {
    this.router
      .navigateByUrl('data')
      .then(() =>
        this.store.dispatch(
          DataAction.getDatabyUID({ UID: this.user?.uid as string })
        )
      );
  }
}
