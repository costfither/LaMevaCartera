import { categoria } from 'src/app/Categories/models/categoria.model';

export class data {
  public id?: string;
  public idData: number;
  public UID: string;
  public Category: categoria | number;
  public description: string;
  public value: number;
  public type: boolean; //False = Despesa ..... True = Ingress
  public publication_date: Date;

  constructor(
    UID: string = '',
    description: string = '',
    Category: categoria = new categoria(),
    value: number = 0,
    type: boolean = false,
    id: string = '',
    publication_date: Date = new Date()
  ) {
    this.id = id;
    this.idData = new Date().getTime();
    this.UID = UID;
    this.description = description;
    this.Category = Category;
    this.value = value;
    this.type = type;
    this.publication_date = publication_date;
  }
}

export interface IData {
  id?: string;
  idData: number;
  UID: string;
  Category: categoria | number; //llista de ids de categories
  description: string;
  value: number;
  type: boolean; //False = Despesa ..... True = Ingress
  publication_date: Date;
}
