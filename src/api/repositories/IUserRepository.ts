import { User } from "../entities/User";

export interface IFindOtherEmail {
  id: string;
  email: string;
}

export interface IFindFirst {
  field: "id" | "email";
  value: string;
}

export abstract class IUserRepository {
  abstract find_first(props: IFindFirst): Promise<User>;
  abstract find_other_email(props: IFindOtherEmail): Promise<User | void>;
  abstract save(props: Omit<User, "id">): Promise<void>;
}
