import {TurnIncrement} from './turn-increment';

export class InMemoryTurnIncrement implements TurnIncrement{
  protected turn = 0;

  increment() {
    this.turn++;
  }

  getTurn() {
    return this.turn;
  }
}