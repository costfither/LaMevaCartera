import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { data, IData } from '../models/data.model';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public firestore: Firestore) {}

  //obtenir transctions per UID
  getDatabyUID({ UID }: { UID: string }): Observable<data[]> {
    const dataRef = collection(this.firestore, 'data');
    const q = query(dataRef, where('UID', '==', UID));
    return collectionData(q, { idField: 'id' }) as Observable<data[]>;
  }

  //obtenir transctions per ID
  getDatabyID({
    idData,
    UID,
  }: {
    idData: string;
    UID: string;
  }): Observable<data[]> {
    const dataRef = collection(this.firestore, 'data');
    const q = query(dataRef, where('UID', '==', UID));
    const result = query(q, where('id', '==', idData));
    return collectionData(result, { idField: 'id' }) as Observable<data[]>;
  }

  //actualizar transaction
  updateData({
    id,
    transaction,
  }: {
    id: string;
    transaction: data;
  }): Observable<void> {
    const dataUpdate = doc(this.firestore, 'data/' + id);
    return from(setDoc(dataUpdate, transaction));
  }

  //create transaction
  createData({ transaction }: { transaction: IData }): Observable<unknown> {
    const newData = doc(collection(this.firestore, 'data'));
    return from(setDoc(newData, transaction));
  }

  //eliminar transaction
  deleteData({ transaction }: { transaction: IData }): Observable<void> {
    const docData = doc(this.firestore, `data/${transaction.id}/`);
    return from(deleteDoc(docData));
  }
}
