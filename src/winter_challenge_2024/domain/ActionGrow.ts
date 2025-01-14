import {Position} from "./Position";
import {OrganType} from "../interfaces";
import {Action} from "./Action";
import {Organ} from "./grid/Organ";


export class ActionGrow extends Action {
    private readonly typeToCreate: OrganType = 'BASIC'

    constructor(
        private readonly organ: Organ,
        private readonly destination: Position
    ){
        super('GROW')
        if(organ.position.isSame(destination)){
            throw new Error('the destination should be on another cell from the organ')
        }
        this.organ = organ
        this.destination = destination
    }

    toString() {
        return `${this.actionType} ${this.organ.id} ${this.destination.toString()} ${this.typeToCreate}`;
    }
}