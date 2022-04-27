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
  categoryList: { categoria: categoria; selected: boolean }[];
  private user: User | null | undefined;
  displayedColumns: string[] = ['checkbox', 'name', 'description', 'action'];
  selectCategory: categoria[];
  selectAll: boolean = false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.categoryList = new Array<{
      categoria: categoria;
      selected: boolean;
    }>();
    this.selectCategory = new Array<categoria>();

    this.store.select('userState').subscribe((user) => {
      if (user) {
        this.user = user.usuario;
        this.loadCategory();
      }
    });
    this.store.select('categoryState').subscribe((categories) => {
      this.categoryList = categories?.categories.map((value) => {
        return { categoria: value, selected: false };
      });
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
    this.categoryList = this.categoryList.map((categoria) => {
      categoria.selected = ob;
      return categoria;
    });
  }

  checkElement(categoria: categoria) {
    this.categoryList = this.categoryList.map((value) => {
      if (value.categoria == categoria) {
        value.selected = !value.selected;
      }
      return value;
    });
  }

  createCategory(): void {
    this.router.navigateByUrl('category/add');
  }

  updateCategory(id: string | undefined): void {
    this.router.navigateByUrl('category/' + id);
  }
  deleteSelect(categories: categoria[]) {
    categories.forEach((categoria) => {
      this.deleteCategory(categoria);
    });
  }

  deleteCategory(categoria: categoria): void {
    console.log(categoria);
    let result = confirm(
      'Confirmar eliminar categoria amb identificador: ' + categoria.id + ' .'
    );
    if (result) {
      const category = this.categoryList.find(
        (category) => category.categoria.id === categoria.id
      ) as { categoria: categoria; selected: boolean };
      console.log(category);
      this.store.dispatch(
        CategoriesAction.deleteCategory({ category: category.categoria })
      );
    }
  }
}
