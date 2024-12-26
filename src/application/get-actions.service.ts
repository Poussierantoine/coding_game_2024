import {GameGateway, GridSize} from "../interfaces";
import {ActionWait} from "../domain/ActionWait";


export class GetActionsService {
    private gridSize?: GridSize

    constructor(
        private gameGateway: GameGateway,
    ) {
    }

    execute() {
        if(!this.gridSize){
          this.gridSize = this.gameGateway.getInitialization();
        }
        const turn = this.gameGateway.getTurnInfo(this.gridSize)

        const actions = []

        if(turn){
            for(let i = 0; i< turn.requiredActionCount; i++){
                actions.push(new ActionWait())
            }
        }
        return actions;
    }


}