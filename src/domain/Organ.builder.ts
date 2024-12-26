import {Direction, OrganType} from "../interfaces";
import {Organ} from "./Organ";
import {Position} from "./Position";

type OrganBuilderProps =  {
    id: number
    position: Position
    type: OrganType
    direction: Direction
    rootId: number
    parentId: number
    owner: 0 | 1
}

export class OrganBuilder {
    private props: OrganBuilderProps;

    constructor(props: Partial<OrganBuilderProps>) {
        this.props =  {
            id: props.id ?? 1,
            position: props.position ?? new Position(0,0),
            type: props.type ?? 'ROOT',
            direction: props.direction ?? 'N',
            rootId: props.rootId ?? 1,
            parentId: props.parentId ?? 1,
            owner: props.owner ?? 0,
        }
    }

    build(){
        return new Organ(this.props)
    }

}