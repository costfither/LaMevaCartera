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
import { UserService } from 'src/app/User/services/user.service';
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
  categories: FormControl;
  value: FormControl;
  publication_date: FormControl;
  dataForm: FormGroup;

  isValidForm: boolean | null;

  isUpdateMode: boolean;
  private transaccionId: string | null;
  private transaccionIdData: number;
  categoriesList!: categoria[];

  private userId: string;
  private user: User | null | undefined;
  userCategoriesIDs: number[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.userService.getUser().subscribe((user) => {
      this.userId = user?.uid as string;
    });
    this.isValidForm = null;
    this.transaccionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.transaccio = new data('', '', [], 0, false, '', new Date());
    this.isUpdateMode = false;
    this.transaccionIdData = 0;

    this.description = new FormControl(this.transaccio.description, [
      Validators.required,
    ]);
    this.type = new FormControl(this.transaccio.type);
    this.value = new FormControl(this.transaccio.value, [Validators.required]);
    this.categories = new FormControl([]);
    this.publication_date = new FormControl(this.transaccio.publication_date, [
      Validators.required,
    ]);

    this.dataForm = this.formBuilder.group({
      description: this.description,
      type: this.type,
      value: this.value,
      CategoryList: this.categories,
      publication_date: this.publication_date,
    });
    this.store.select('user').subscribe((user) => {
      this.user = user.usuario;
    });
    this.store.select('category').subscribe((category) => {
      this.categoriesList = category.categories;
    });
    this.store.select('transaction').subscribe((transaccioState) => {
      if (transaccioState.transaction) {
        this.transaccio = transaccioState.transaction;
        this.transaccionIdData = this.transaccio.idData;
        if (this.transaccio.CategoryList) {
          this.transaccio.CategoryList.forEach((cat: categoria) => {
            this.userCategoriesIDs.push(cat.idCategory);
          });
          this.categories.setValue(this.userCategoriesIDs);
          this.description.setValue(this.transaccio.description);
          let type;
          if (this.transaccio.type) {
            type = 'true';
          } else {
            type = 'false';
          }
          this.type.setValue(type);
          this.value.setValue(this.transaccio.value);
          this.publication_date.setValue(this.transaccio.publication_date);
        }
      }
    });
  }

  private loadTransaccion(): void {
    if (this.transaccionId && this.userId) {
      this.store.dispatch(
        DataAction.getDatabyID({ idData: this.transaccionId, UID: this.userId })
      );
    }
  }

  private loadCategories(): void {
    if (this.userId) {
      this.store.dispatch(
        CategoriesAction.getCategoriesbyUID({ UID: this.userId })
      );
    }
  }

  ngOnInit(): void {
    this.loadCategories();
    if (this.transaccionId && this.userId) {
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
      if (this.userId) {
        this.transaccio.UID = this.userId;
        this.transaccio.id = this.transaccionId;
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
    if (this.userId) {
      this.transaccio.UID = this.userId;
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
    if (this.userId) {
      this.router
        .navigateByUrl('/data')
        .then(() =>
          this.store.dispatch(DataAction.getDatabyUID({ UID: this.userId }))
        );
    }
  }
}
