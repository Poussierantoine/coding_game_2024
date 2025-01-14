import {GridSize, ITurnInfo, ProteinType} from "../interfaces";
import {Organ} from "./grid/Organ";
import {Grid} from "./grid/Grid";
import {Protein} from "./grid/Protein";

export class TurnInfo {
     private readonly _grid: Grid;
     private readonly myProteins: { [key in ProteinType]: number };
     private readonly oppProteins: { [key in ProteinType]: number };
     private readonly myOrgans: Organ[];
     private readonly oppOrgans: Organ[];
     private readonly organMap: Map<number, Organ>;
     private readonly width: number;
     private readonly height: number;
     private readonly _requiredActionCount: number;
     private readonly _proteins: Protein[];

    constructor(
        {turn, gridSize, requiredActionCount}: { turn: ITurnInfo, gridSize: GridSize, requiredActionCount: number },
    ) {
        this._grid = turn.grid
        this.myProteins = turn.myProteins
        this.oppProteins = turn.oppProteins
        this.myOrgans = turn.myOrgans
        this.oppOrgans = turn.oppOrgans
        this.organMap = turn.organMap
        this._proteins = turn.proteins
        this.width = gridSize.width
        this.height= gridSize.height
        this._requiredActionCount= requiredActionCount
    }

    get requiredActionCount () {
        return this._requiredActionCount
    }

    get playerOrgans () {
        return this.myOrgans
    }

    get opponentOrgans () {
        return this.oppOrgans
    }

    get proteins () {
        return this._proteins
    }

    get grid() {
        return this._grid
    }

    toString(){
        return this.grid.toString()
    }

}