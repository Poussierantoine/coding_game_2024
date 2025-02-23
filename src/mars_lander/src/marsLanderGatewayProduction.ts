import {Position} from './Position';
import {readline} from '../../common/read-line';
import {MarsLanderGateway} from './marsLanderGateway';

export class MarsLanderGatewayProduction implements MarsLanderGateway {
  getLandInfo() {
    const surfaceNumberOfPoints: number = parseInt(readline());
    const landInfo: Position[] = [];
    for (let i = 0; i < surfaceNumberOfPoints; i++) {
      const [x, y]: string[] = readline().split(' ');
      landInfo.push(new Position(parseInt(x), parseInt(y)));
    }
    return landInfo;
  }

  getShipInfo() {
    const [
      positionX,
      positionY,
      horizontalSpeed,
      verticalSpeed,
      fuel,
      rotationAngle,
      power
    ]: string[] = readline().split(' ');

    const shipPosition = new Position(parseInt(positionX), parseInt(positionY));
    return {
      position: shipPosition,
      horizontalSpeed: parseInt(horizontalSpeed),
      verticalSpeed: parseInt(verticalSpeed),
      fuel: parseInt(fuel),
      rotationAngle: parseInt(rotationAngle),
      power: parseInt(power)
    };
  }
}