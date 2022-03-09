export class User {
  public id: number;
  public UID: string;
  public name: string;
  public surname1: string;
  public surname2: string;
  public email: string;
  public password: string;

  constructor(
    name: string,
    surname_1: string,
    surname_2: string,
    id: number,
    UID: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.surname1 = surname_1;
    this.surname2 = surname_2;
    this.email = email;
    this.password = password;
    this.id = id;
    this.UID = UID;
  }
}
