import {TurnInfo} from "../domain/TurnInfo";
import {Position} from "../domain/Position";
import {Owner, PLAYER, ProteinType} from "../interfaces";
import {Organ} from "../domain/grid/Organ";
import {Protein} from "../domain/grid/Protein";

export class GetNearestElementService {


    constructor(private readonly turnInfo: TurnInfo) {
    }

    getNearestOrgan(goal: Position, player: Owner): Organ|null {
        let nearestDistance = Number.MAX_VALUE;
        let nearestOrgan: Organ |null = null;
        const organs = player === PLAYER ? this.turnInfo.playerOrgans : this.turnInfo.opponentOrgans;
        const organsNotOnTarget = organs.filter(organ => !organ.position.isSame(goal));
        organsNotOnTarget.forEach(organ => {
                const distance = organ.position.getDistance(goal);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestOrgan = organ;
                }
        });
        return nearestOrgan;
    }

    getNearestProtein(goal: Position, proteinType: ProteinType): Protein|null {
        let nearestDistance = Number.MAX_VALUE;
        let nearestProtein: Protein |null = null;
        const proteins = this.turnInfo.proteins.filter(protein => protein.type === proteinType);
        proteins.forEach(protein => {
            const distance = protein.position.getDistance(goal);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestProtein = protein;
            }
        });
        return nearestProtein;
    }
}