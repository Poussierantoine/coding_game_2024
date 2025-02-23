export interface ActionAndLogGateway {
  log(objectOrMessage: string | object): void;
  doAction(action: string): void;
}