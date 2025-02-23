import {ActionAndLogGateway} from './action-and-log-gateway';

export class ProductionActionAndLogGateway implements ActionAndLogGateway {
  log(objectOrMessage: string | object) {
    console.error(objectOrMessage);
  };

  doAction(action: string) {
    console.log(action);
  }
}