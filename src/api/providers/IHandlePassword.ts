export abstract class IHandlePassword {
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, hashPassword: string): Promise<boolean>;
}
