import {Action} from './Action';


export class ActionWait extends Action {
  constructor(
  ){
    super('WAIT');
  }

  toString() {
    return `${this.actionType}`;
  }
}