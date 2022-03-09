export class categoria {
  public id: number;
  public UID: string;
  public name: string;
  public description: string;
  public color: string;

  constructor(UID: string, name: string) {
    this.id = new Date().getTime();
    this.UID = UID;
    this.name = name;
    this.description = '';
    this.color = '#FFFFFF';
  }
}
