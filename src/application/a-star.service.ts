import {Grid} from "../domain/Grid";
import {Position} from "../domain/Position";
import {PathNode} from "../domain/PathNode";
import {Cell} from "../domain/Cell";
import {Logger} from "../utils/logger";


type Heuristic = 'distance'



export class AStarService {


    constructor(
        private readonly grid: Grid,
        private readonly logger: Logger
    ) {
    }

    getShortestPath(startPosition: Position, endPosition: Position, heuristic: Heuristic = 'distance') {
        const destinationCell = this.grid.getCell(endPosition)
        let startNode = this.createPathNode(this.grid.getCell(startPosition), destinationCell, heuristic);
        const closeList: PathNode[] = [];
        const openList: PathNode[] = [startNode]

        let total = 0

        while (openList.length) {
            total++

            this.logger.log('*************************')
            this.logger.log('turn : ' + total)
            this.logger.log('list : ' + openList.map(n => {
                return n.position.toString() + ' h: ' + n.heuristic
            }).join('; '))
            const currentNode = openList.shift()
            this.logger.log('current node : ' + currentNode!.position.toString())
            this.logger.log('current heuristics : ' + currentNode!.heuristic)
            this.logger.log('heuristics : ' + openList.map(n => n.heuristic).join('; '))
            const adjacentNodes = this.getAdjacentNodes(currentNode!, destinationCell, heuristic);
            let destinationNode = adjacentNodes.find(node => node.position.isSame(endPosition));
            if (destinationNode) {
                this.logger.log('total:' + total)

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
        this.logger.log('adjacent cells : ' + adjacentCells.map(cell => cell.toString() + ' ' + cell.position.toString()).join('; '))
        const nonWallCells = adjacentCells.filter(cell => !cell.isWall)
        return nonWallCells.map(cell => this.createPathNode(
            cell,
            destinationCell,
            heuristic,
            node
        ))
    }

}