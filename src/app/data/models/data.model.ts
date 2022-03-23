import { categoria } from 'src/app/Categories/models/categoria.model';

export class data {
  public id?: string;
  public idData: number;
  public UID: string;
  public CategoryList: categoria[];
  public description: string;
  public value: number;
  public type: boolean; //False = Despesa ..... True = Ingress
  public publication_date: Date;

  constructor(
    UID: string,
    description: string,
    CategoryList: categoria[],
    value: number,
    type: boolean,
    id: string,
    publication_date: Date
  ) {
    this.id = id;
    this.idData = new Date().getTime();
    this.UID = UID;
    this.description = description;
    this.CategoryList = CategoryList;
    this.value = value;
    this.type = type;
    this.publication_date = publication_date;
  }
}

export interface IData {
  id?: string;
  idData: number;
  UID: string;
  CategoryList: categoria[]; //llista de ids de categories
  description: string;
  value: number;
  type: boolean; //False = Despesa ..... True = Ingress
  publication_date: Date;
}
