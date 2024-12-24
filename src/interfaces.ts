import {Game} from "./Game";

/**
 * Game Reader interfaces
 */

export type GridSize = {
    width: number
    height: number
}

export type GetInitialization = () => GridSize
export type TurnInfo = {
    requiredActionsCount: number
    game: Game
}
export type GetTurnInfo = (gridSize: GridSize) => TurnInfo

export interface GameReader {
    getInitialization: GetInitialization
    getTurnInfo: GetTurnInfo
}

/**
 * Game interfaces
 */

export type OrganType = 'ROOT' | 'BASIC'

export type ProteinType = 'A' | 'B' | 'C' | 'D'

export type Direction = 'N' | 'E' | 'S' | 'W'

export interface Position {
    x: number
    y: number
}

export interface Organ {
    id: number
    position: Position
    type: OrganType
    direction: Direction
    rootId: number
    parentId: number
    owner: 0 | 1
}

export interface Cell {
    position: Position
    isWall: boolean
    protein?: ProteinType
    organ?: Organ
}

export interface IGame {
    grid: Cell[][]
    myProteins: { [key in ProteinType]: number }
    oppProteins: { [key in ProteinType]: number }
    myOrgans: Organ[]
    oppOrgans: Organ[]
    organMap: Map<number, Organ>
}
