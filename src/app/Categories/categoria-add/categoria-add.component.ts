import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as CategoriesAction from '../actions';
import { categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css'],
})
export class CategoriaAddComponent implements OnInit {
  categoryForm: FormGroup;
  name: FormControl;
  description: FormControl;
  color: FormControl;
  categoria: categoria;
  isValidForm: boolean | null;

  private user: User | null | undefined;
  private categoryIdField: string | null;
  isUpdateMode: boolean;
  private categoryId: number | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isValidForm = null;
    this.categoryIdField = this.activatedRoute.snapshot.paramMap.get('id');
    this.categoria = new categoria();
    this.categoryId = this.categoria.idCategory;
    this.isUpdateMode = false;
    if (this.categoryIdField) {
      this.isUpdateMode = true;
    }
    this.name = new FormControl(this.categoria.name, [Validators.required]);
    this.description = new FormControl(this.categoria.description);
    this.color = new FormControl(this.categoria.color, [Validators.required]);

    this.categoryForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      color: this.color,
    });

    this.store.select('userState').subscribe((user) => {
      this.user = user?.usuario;
    });
    this.store.select('categoryState').subscribe((categoryState) => {
      if (categoryState?.category) {
        this.categoria = categoryState.category;
        this.name.setValue(this.categoria.name);
        this.description.setValue(this.categoria.description);
        this.color.setValue(this.categoria.color);
      }
    });
  }
  private loadCategory(): void {
    this.store.dispatch(
      CategoriesAction.getCategorybyID({
        idCategory: this.categoryIdField as string,
        UID: this.user?.uid as string,
      })
    );
  }

  ngOnInit(): void {
    //update
    if (this.categoryIdField) {
      this.isUpdateMode = true;
      this.loadCategory();
    } else {
      this.categoryForm.reset();
    }
  }

  goListCategory() {
    this.route
      .navigateByUrl('category')
      .then(() =>
        this.store.dispatch(
          CategoriesAction.getCategoriesbyUID({ UID: this.user?.uid as string })
        )
      );
  }

  private editCategory(): void {
    if (this.categoryIdField) {
      if (this.user?.uid) {
        this.categoria.UID = this.user?.uid;
        this.store.dispatch(
          CategoriesAction.updateCategory({
            idCategory: this.categoryIdField,
            category: this.categoria,
          })
        );
        this.goListCategory();
      }
    }
  }

  private createCategory(): void {
    if (this.user?.uid) {
      this.categoria.UID = this.user?.uid;
      if (this.categoryId) this.categoria.idCategory = this.categoryId;
      this.store.dispatch(
        CategoriesAction.createCategories({ category: this.categoria })
      );
      this.route.navigateByUrl('category');
    }
  }
  saveCategory() {
    this.isValidForm = false;
    if (this.categoryForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.categoria = this.categoryForm.value;
    if (this.isUpdateMode) {
      this.editCategory();
    } else {
      this.createCategory();
    }
  }
}
