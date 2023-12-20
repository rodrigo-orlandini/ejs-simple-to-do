export abstract class UseCase {
  abstract execute(...arg: any): Promise<any>;
}
