export class data {
  public id: number;
  public UID: string;
  public CategoryList: number[];
  public description: string;
  public value: number;
  public type: boolean; //False = Despesa ..... True = Ingress

  constructor(UID: string, description: string) {
    this.id = new Date().getTime();
    this.UID = UID;
    this.description = description;
    this.CategoryList = [];
    this.value = 0;
    this.type = false;
  }
}
