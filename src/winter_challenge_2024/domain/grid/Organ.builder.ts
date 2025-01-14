import {Direction, OrganType, Owner, PLAYER, UP} from '../../interfaces';
import {Organ} from './Organ';
import {Position} from '../Position';

type OrganBuilderProps =  {
    id: number
    position: Position
    type: OrganType
    direction: Direction
    rootId: number
    parentId: number
    owner: Owner
}

export class OrganBuilder {
  private props: OrganBuilderProps;

  constructor(props: Partial<OrganBuilderProps>) {
    this.props =  {
      id: props.id ?? 1,
      position: props.position ?? new Position(0,0),
      type: props.type ?? 'ROOT',
      direction: props.direction ?? UP,
      rootId: props.rootId ?? 1,
      parentId: props.parentId ?? 1,
      owner: props.owner ?? PLAYER,
    };
  }

  build(){
    return new Organ(this.props);
  }

}