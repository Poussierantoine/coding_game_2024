import {ActionType} from '../interfaces';


export abstract class Action {
  protected constructor(
        protected readonly actionType: ActionType,
  ){}

    abstract toString() : string;
}