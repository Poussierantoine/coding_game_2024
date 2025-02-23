import {Position} from './Position';

export type ShipInfo = {
  position: Position,
  horizontalSpeed: number,
  verticalSpeed: number,
  fuel: number,
  rotationAngle: number,
  power: number,
}

export interface MarsLanderGateway {
  getLandInfo: () => Position[];
  getShipInfo(): ShipInfo;
}