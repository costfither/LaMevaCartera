import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { categoria, ICategory } from '../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private firestore: Firestore) {}

  getCategoriesbyUID(UID: string): Observable<categoria[]> {
    const categoriaRef = collection(this.firestore, 'category');
    const q = query(categoriaRef, where('UID', '==', UID));
    return collectionData(q, { idField: 'id' }) as Observable<categoria[]>;
  }

  getCategorybyId(idCategory: string, UID: string): Observable<categoria[]> {
    let categoryList = this.getCategoriesbyUID(UID);
    categoryList.subscribe((value) => {
      return value.find((value) => {
        value.id === idCategory;
      });
    });

    return categoryList;
  }

  updateCategory(id: string, category: categoria): Observable<void> {
    const categoryUpdate = doc(this.firestore, 'category/' + id);
    return from(setDoc(categoryUpdate, category));
  }

  createCategory(category: ICategory): Observable<void> {
    const newCategory = doc(collection(this.firestore, 'category'));
    return from(setDoc(newCategory, category));
  }

  deleteCategory(Category: ICategory): Observable<void> {
    const docCategory = doc(this.firestore, `category/${Category.id}/`);
    return from(deleteDoc(docCategory));
  }
}
