import {ActionWait} from "../domain/ActionWait";
import {GetNearestElementService} from "./get-nearest-element.service";
import {ActionGrow} from "../domain/ActionGrow";
import {AStarService} from "./a-star.service";
import {Action} from "../domain/Action";
import {TurnInfo} from "../domain/TurnInfo";
import {Protein} from "../domain/grid/Protein";
import {Organ} from "../domain/grid/Organ";
import {Cell} from "../domain/grid/Cell";


type ProteinAndPath = {
    protein: Protein,
    path: Cell[]
}

type OrganWithRechableProtein = {
    organ: Organ,
    protein: Protein,
    path: Cell[],
}

export class GetActionsService {

    execute(turn: TurnInfo) {
        const actions: Action[] = []

        for (let i = 0; i < turn.requiredActionCount; i++) {
            const pathToReachableProtein = this.getNearestOrganWithReachableProtein(turn)

            if (pathToReachableProtein) {
                const firstCell = pathToReachableProtein.path[1]
                actions.push(new ActionGrow(pathToReachableProtein.organ, firstCell.position))
            } else {
                this.growUntilYouDie(actions, turn)
            }
        }

        return actions;
    }

    private getNearestOrganWithReachableProtein(turn: TurnInfo): OrganWithRechableProtein | null {
        const pathToProtein = turn.playerOrgans.map(organ => this.getPathToNearestProtein(organ, turn)).filter(path => path !== null)
        if(pathToProtein.length){
            pathToProtein.sort((a, b) => a.path.length - b.path.length);
            return {
                organ: pathToProtein[0].organ,
                protein: pathToProtein[0].protein,
                path: pathToProtein[0].path
            }
        } else {
            const pathsToReachableProtein = turn.playerOrgans.map(organ => this.getPathToNearestReachableProtein(organ, turn)).filter(path => path !== null)

            if (pathsToReachableProtein.length) {
                pathsToReachableProtein.sort((a, b) => a.path.length - b.path.length);
                return pathsToReachableProtein[0]
            }
            return null
        }
    }

    private getPathToNearestProtein(organ: Organ, turn: TurnInfo): OrganWithRechableProtein | null {
        const getNearestElementService = new GetNearestElementService(turn)
        const nearestProtein = getNearestElementService.getNearestProtein(organ.position, 'A')
        if(nearestProtein){
            this.getPathToProtein(organ, nearestProtein, turn)
        }
        return null
    }

    private getPathToNearestReachableProtein(organ: Organ, turn: TurnInfo): OrganWithRechableProtein | null {
        const proteins = turn.proteins.filter(protein => protein.type === 'A')
        const pathToProteins = proteins.map(protein => {
            return this.getPathToProtein(organ, protein, turn)
        }).filter(path => path !== null)
        if(pathToProteins.length){
            pathToProteins.sort((a, b) => a.path.length - b.path.length);
            return pathToProteins[0]
        }
        return null
    }

    private getPathToProtein(organ: Organ, protein: Protein, turn: TurnInfo): OrganWithRechableProtein | null {
        const aStarService = new AStarService(turn.grid)
        const path = aStarService.getShortestPath(organ.position, protein.position)
        if (path) {
            return {
                organ,
                protein,
                path,
            }
        }
        return null
    }

    private growUntilYouDie(actions: Action[], turn: TurnInfo) {
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

    private fallBackOnDefaultAction(actions: Action[]): void {
        actions.push(new ActionWait())
    }




}