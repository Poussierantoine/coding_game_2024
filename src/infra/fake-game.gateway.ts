import {GameGateway, GridSize} from "../interfaces";
import {TurnInfo} from "../domain/TurnInfo";
import {Action} from "../domain/Action";


type FakeGameGatewayProps = {
    initialization: GridSize,
    turns: TurnInfo[],
};

export class FakeGameGateway implements GameGateway {
    private turns: TurnInfo[]
    private initialization: GridSize
    private actualTurn = 0

    printedElements: string[] = [];
    executedActions: Action[] = []

    constructor({initialization, turns}: Partial<FakeGameGatewayProps>) {
        this.turns = turns ?? [];
        this.initialization = initialization ?? {width: 0, height: 0};
    }

    getInitialization() {
        return this.initialization
    };

    getTurnInfo() {
        const turn = this.turns[this.actualTurn];
        this.actualTurn ++;
        return turn;
    };

    print(stringToPrint: string) {
        this.printedElements.push(stringToPrint);
    };

    doAction(action: Action) {
        this.executedActions.push(action);
    };

}