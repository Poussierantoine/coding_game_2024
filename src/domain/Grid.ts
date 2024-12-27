import {GridSize} from "../interfaces";
import {Cell} from "./Cell";
import {Position} from "./Position";

export class Grid {
    public readonly width: number;
    public readonly height: number;
    private readonly cells: Cell[][];

    constructor(gridSize: GridSize) {
        this.width = gridSize.width
        this.height= gridSize.height
        this.cells = []
        for(let i = 0; i < this.width; i++){
            this.cells.push([])
            for (let j = 0; j < this.height; j++){
                this.cells[i].push(new Cell({position: new Position(i, j), isWall: false}))
            }
        }
    }

    setCells(...cells: Cell[]){
        cells.forEach(cell => {
            this.checkIsOutsideGrid(cell.position)
             this.cells[cell.position.x][cell.position.y] = cell
        })
    }

    getCell(position : Position) {
        this.checkIsOutsideGrid(position)
        return this.cells[position.y][position.x]
    }

    canMoveTo(position: Position){
        let cell = this.getCell(position);
        return !(cell.isWall
            || cell.organ);

    }

    getAdjacentCells(position: Position) {
        let adjacentPositions = position.getAdjacentPositions();
        const adjacentCells: Cell[] = [];
        adjacentPositions.forEach(pos => {
            try{
                adjacentCells.push(this.getCell(pos))
            } catch (e){
            }
        })
        return adjacentCells
    }

    toString() {
        const columns = []
        for (const column of this.cells) {
            const columnToString = column.map(cell => cell.toString()).join(' ')
            columns.push(columnToString)
        }
        return columns.join('\n')
    }

    private checkIsOutsideGrid(position: Position) {
        if(
            position.x > this.width-1
            || position.x <0
            || position.y <0
            || position.x > this.height-1
        ){
            throw new Error(`given position is outside the grid : ${position.toString()}`)
        }
    }
}