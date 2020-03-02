export declare class Model {
  readonly data: object [];

  constructor(mixinData: object);

  public insert(document: object): any;
  public insert(documents: object[]): any;

  public remove(index: number): boolean;
  public remove(query: object): boolean;

  public update(index: number): ayn;
} 