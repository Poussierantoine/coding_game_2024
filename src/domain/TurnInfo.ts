import {GridSize, ITurnInfo, ProteinType} from "../interfaces";
import {Cell} from "./Cell";
import {Organ} from "./Organ";

export class TurnInfo {
     private readonly grid: Cell[][];
     private readonly myProteins: { [key in ProteinType]: number };
     private readonly oppProteins: { [key in ProteinType]: number };
     private readonly myOrgans: Organ[];
     private readonly oppOrgans: Organ[];
     private readonly organMap: Map<number, Organ>;
     private readonly width: number;
     private readonly height: number;
     private readonly _requiredActionCount: number;

    constructor(
        turn: ITurnInfo,
        gridSize: GridSize,
        requiredActionCount: number,
    ) {
        this.grid = turn.grid
        this.myProteins = turn.myProteins
        this.oppProteins = turn.oppProteins
        this.myOrgans = turn.myOrgans
        this.oppOrgans = turn.oppOrgans
        this.organMap = turn.organMap
        this.width = gridSize.width
        this.height= gridSize.height
        this._requiredActionCount= requiredActionCount
    }

    get requiredActionCount () {
        return this._requiredActionCount
    }

    toString(){
        const columns = []
        for (const column of this.grid) {
            const columnToString = column.map(cell => cell.toString()).join(' ')
            columns.push(columnToString)
        }
        return columns.join('\n')
    }

}