import {TurnInfo} from "./domain/TurnInfo";
import {Organ} from "./domain/Organ";
import {Action} from "./domain/Action";
import {Grid} from "./domain/Grid";

export type OrganType = 'ROOT' | 'BASIC'

export type ProteinType = 'A' | 'B' | 'C' | 'D'

export type Direction = 'N' | 'E' | 'S' | 'W'

export type ActionType = 'GROW' | 'WAIT'

export interface ITurnInfo {
    grid: Grid
    myProteins: { [key in ProteinType]: number }
    oppProteins: { [key in ProteinType]: number }
    myOrgans: Organ[]
    oppOrgans: Organ[]
    organMap: Map<number, Organ>
}

export type GridSize = {
    width: number
    height: number
}

export type GetInitialization = () => GridSize
export type GetTurnInfo = (gridSize: GridSize) => TurnInfo

export interface GameGateway {
    getInitialization: GetInitialization
    getTurnInfo: GetTurnInfo
    print: (stringToPrint: string) => void;
    doAction: (action: Action) => void
}

