import {ActionAndLogGateway} from './action-and-log-gateway';

export class TestActionAndLogGateway implements ActionAndLogGateway {
  logs: Array<string | object> = [];
  actions: string[] = [];

  log(objectOrMessage: string | object) {
    this.logs.push(objectOrMessage);
  };

  doAction(action: string) {
    this.actions.push(action);
  }

  clear() {
    this.logs = [];
    this.actions = [];
  }
}