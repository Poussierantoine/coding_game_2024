import {Grid} from "../domain/grid/Grid";
import {Position} from "../domain/Position";
import {PathNode} from "../domain/PathNode";
import {Cell} from "../domain/grid/Cell";


type Heuristic = 'distance'



export class AStarService {


    constructor(
        private readonly grid: Grid,
    ) {
    }

    getShortestPath(startPosition: Position, endPosition: Position, heuristic: Heuristic = 'distance') {
        const destinationCell = this.grid.getCell(endPosition)
        let startNode = this.createPathNode(this.grid.getCell(startPosition), destinationCell, heuristic);
        const closeList: PathNode[] = [];
        const openList: PathNode[] = [startNode]

        while (openList.length) {
            const currentNode = openList.shift()
            const adjacentNodes = this.getAdjacentNodes(currentNode!, destinationCell, heuristic);
            let destinationNode = adjacentNodes.find(node => node.position.isSame(endPosition));
            if (destinationNode) {
                return destinationNode.toCellArray()
            }
            adjacentNodes.forEach(node => {
                if(
                    !closeList.some(closedNode => closedNode.position.isSame(node.position))
                    && !openList.some(
                        openNode => (
                            openNode.position.isSame(node.position)
                            && openNode.cost <= node.cost
                        )
                    )
                ) {
                    openList.push(node)
                }
            })
            closeList.push(currentNode!)
            openList.sort((n1, n2) => n1.heuristic - n2.heuristic)
        }


    }

    private createPathNode(cell: Cell, destinationCell: Cell, heuristic: Heuristic, parent?: PathNode) {
        const node = new PathNode(
            cell,
            parent?.cost ?? 0,
            parent
        );
        this.createHeuristic(node, destinationCell, heuristic)
        return node
    }

    private createHeuristic(node: PathNode, destinationCell: Cell, heuristic: Heuristic) {
        if(heuristic === 'distance'){
            node.heuristic = node.cost + node.position.getDistance(destinationCell.position)
        }
    }

    private getAdjacentNodes(node: PathNode, destinationCell: Cell, heuristic: Heuristic){
        const adjacentCells = this.grid.getAdjacentCells(node.position)
        const nonWallCells = adjacentCells.filter(cell => !cell.isWall)
        const nonOrganCells = nonWallCells.filter(cell => !cell.organ || cell.position.isSame(destinationCell.position))
        return nonOrganCells.map(cell => this.createPathNode(
            cell,
            destinationCell,
            heuristic,
            node
        ))
    }

}