import {GameGateway, GridSize, PLAYER} from "../interfaces";
import {ActionWait} from "../domain/ActionWait";
import {GetNearestElementService} from "./get-nearest-element.service";
import {Position} from "../domain/Position";
import {ActionGrow} from "../domain/ActionGrow";
import {AStarService} from "./a-star.service";
import {Action} from "../domain/Action";
import {TurnInfo} from "../domain/TurnInfo";


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
                    //TODO bloquer l'ennemi ?
                    // if (!goal) {
                    //     goal = getNearestElementService.getNearestOrgan(rootOrgan.position, OPPONENT)?.position
                    // }
                    if(!goal){
                        this.growUntilYouDie(actions, turn)
                    } else {
                        const nearestPlayerOrgan = getNearestElementService.getNearestOrgan(
                            goal,
                            PLAYER)

                        //TODO
                        // si il ny a plus de protéine A, grow vers l'adversaire

                        if(nearestPlayerOrgan) {
                            const aStarService = new AStarService(turn.grid)
                            const firstCell = aStarService.getShortestPath(nearestPlayerOrgan.position, goal!)?.[1];
                            if (firstCell) {
                                actions.push(new ActionGrow(nearestPlayerOrgan, firstCell.position))
                            } else {
                                this.growUntilYouDie(actions, turn)
                            }
                        }else {
                            this.fallBackOnDefaultAction(actions)
                        }
                    }
                }

            }
        }
        return actions;
    }

    growUntilYouDie(actions: Action[], turn: TurnInfo) {
        const playerOrgans = turn.playerOrgans
        if(playerOrgans) {
            const organWithEmptyAdjacentCell = playerOrgans.find(organ =>
                turn.grid.getWalkableAdjacentCells(organ.position).length > 0)
            if (organWithEmptyAdjacentCell) {
                const emptyCell = turn.grid.getWalkableAdjacentCells(organWithEmptyAdjacentCell.position)[0]
                actions.push(new ActionGrow(organWithEmptyAdjacentCell, emptyCell.position))
            } else {
                this.fallBackOnDefaultAction(actions)
            }
        } else {
            this.fallBackOnDefaultAction(actions)
        }
    }

    fallBackOnDefaultAction(actions: Action[]): void {
        actions.push(new ActionWait())
    }




}