import {TurnIncrement} from './turn-increment';

export class InMemoryTestTurnIncrement implements TurnIncrement{
  protected turn = 0;

  increment() {
    this.turn++;
  }

  getTurn() {
    return this.turn;
  }

  setTurn(turn: number){
    this.turn = turn;
  }
}