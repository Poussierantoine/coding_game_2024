import {GameGateway, GridSize, OPPONENT, PLAYER} from "../interfaces";
import {ActionWait} from "../domain/ActionWait";
import {GetNearestElementService} from "./get-nearest-element.service";
import {Position} from "../domain/Position";
import {ActionGrow} from "../domain/ActionGrow";
import {AStarService} from "./a-star.service";
import {Action} from "../domain/Action";


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
            const getNearestElementService = new GetNearestElementService(turn)
            for(let i = 0; i< turn.requiredActionCount; i++){
                const rootOrgans = turn.playerOrgans.filter(organ => organ.type === 'ROOT')
                // todo faire pour chaque organ
                const rootOrgan = rootOrgans[0]
                if(!rootOrgan){
                    this.fallBackOnDefaultAction(actions)
                } else {
                    let goal: Position|undefined = getNearestElementService.getNearestProtein(rootOrgan.position, 'A')?.position
                    if (!goal) {
                        goal = getNearestElementService.getNearestOrgan(rootOrgan.position, OPPONENT)?.position
                    }
                    const nearestPlayerOrgan = getNearestElementService.getNearestOrgan(
                        goal!, //TODO remove ce ! et faire un grow aleatoire
                        PLAYER)

                    //TODO
                    // si il ny a plus de protéine A, grow vers l'adversaire

                    if(nearestPlayerOrgan) {
                        const aStarService = new AStarService(turn.grid)
                        const firstCell = aStarService.getShortestPath(nearestPlayerOrgan.position, goal!)?.[1];
                        if (firstCell) {
                            actions.push(new ActionGrow(nearestPlayerOrgan, firstCell.position))
                        } else {
                            // todo autre strategie
                            this.fallBackOnDefaultAction(actions)
                        }
                    }else {
                        this.fallBackOnDefaultAction(actions)
                    }
                }

            }
        }
        return actions;
    }

    fallBackOnDefaultAction(actions: Action[]): void {
        actions.push(new ActionWait())
    }




}