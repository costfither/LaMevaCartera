import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'firebase/auth';
import { AppState } from 'src/app/app.reducers';
import * as CategoriesAction from '../actions';
import { categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css'],
})
export class CategoriaListComponent implements OnInit {
  categoryList: categoria[];
  private user: User | null | undefined;
  displayedColumns: string[] = ['checkbox', 'name', 'description', 'action'];
  selectCategory: categoria[];
  selectAll: boolean = false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.categoryList = new Array<categoria>();
    this.selectCategory = new Array<categoria>();

    this.store.select('user').subscribe((user) => {
      this.user = user.usuario;
      this.loadCategory();
    });
    this.store.select('category').subscribe((categories) => {
      this.categoryList = categories.categories;
    });
  }

  ngOnInit(): void {}

  private loadCategory(): void {
    if (this.user) {
      this.store.dispatch(
        CategoriesAction.getCategoriesbyUID({ UID: this.user.uid })
      );
    }
  }

  checkAll(ob: boolean) {
    if (ob) {
      this.selectCategory = [...this.categoryList];
    } else {
      this.selectCategory = new Array<categoria>();
    }
  }

  checkElement(categoria: categoria) {
    this.selectCategory.push(categoria);
  }

  createCategory(): void {
    this.router.navigateByUrl('category/add');
  }

  updateCategory(id: string | undefined): void {
    this.router.navigateByUrl('category/' + id);
  }
  deleteSelect(categories: categoria[]) {
    categories.forEach((categoria) => {
      this.deleteCategory(categoria.id);
    });
  }

  deleteCategory(id: string | undefined): void {
    let result = confirm(
      'Confirmar eliminar categoria amb identificador: ' + id + ' .'
    );
    if (result) {
      const category = this.categoryList.find(
        (category) => category.id === id
      ) as categoria;
      this.store.dispatch(CategoriesAction.deleteCategory({ category }));
    }
  }
}
