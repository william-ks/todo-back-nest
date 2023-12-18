export abstract class IHandleToken {
  abstract generate(userId: string): string;
  abstract validate(token: string): string;
}
