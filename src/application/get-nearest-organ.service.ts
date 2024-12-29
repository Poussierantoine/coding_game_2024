import {TurnInfo} from "../domain/TurnInfo";
import {Position} from "../domain/Position";
import {Owner, PLAYER} from "../interfaces";
import {Organ} from "../domain/Organ";

export class GetNearestOrganService {


    constructor(private readonly turnInfo: TurnInfo) {
    }

    execute(goal: Position, player: Owner): Organ|null {
        let nearestDistance = Number.MAX_VALUE;
        let nearestOrgan: Organ |null = null;
        const organs = player === PLAYER ? this.turnInfo.playerOrgans : this.turnInfo.opponentOrgans;
        organs.forEach(organ => {
                const distance = organ.position.getDistance(goal);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestOrgan = organ;
                }
        });
        return nearestOrgan;
    }
}