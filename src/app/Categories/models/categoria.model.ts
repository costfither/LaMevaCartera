export class categoria {
  public id?: string;
  public idCategory: number;
  public UID: string;
  public name: string;
  public description: string;
  public color: string;

  constructor(
    UID: string = '',
    name: string = '',
    description: string = '',
    color: string = '',
    id?: string
  ) {
    this.id = id;
    this.idCategory = new Date().getTime();
    this.UID = UID;
    this.name = name;
    this.description = description;
    this.color = color;
  }
}

export interface ICategory {
  id?: string;
  idCategory?: number;
  UID: string;
  name: string;
  description: string;
  color: string;
}
