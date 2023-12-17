import { uuid } from "uuidv4";

export class User {
  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
}
