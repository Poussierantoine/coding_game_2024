import {ProteinType} from "../interfaces";
import {Organ} from "./Organ";
import {Cell} from "./Cell";
import {Position} from "./Position";

type CellBuilderProps =  {
    position: Position
    isWall: boolean
    protein?: ProteinType
    organ?: Organ
}

export class CellBuilder {
    private props: CellBuilderProps;

    constructor(props: Partial<CellBuilderProps>) {
        this.props =  {
            position:  props.position ?? new Position(0,0),
            isWall: props.isWall ?? false,
            organ: props.organ,
            protein: props.protein
        }
    }

    build(){
        return new Cell(this.props)
    }

}