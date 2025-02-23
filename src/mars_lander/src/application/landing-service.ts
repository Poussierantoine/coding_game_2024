import {ShipInfo} from '../infrastructure/marsLanderGateway';
import {Position} from '../domain/Position';

type landingOptions = {
  maxSpeed: number;
  gravityAcceleration: number;
};

export class LandingService {
  constructor(private landingOptions: landingOptions){}

  getPowerForTurn(shipInfo: ShipInfo, landingPosition: Position){
    const verticalDistance = shipInfo.position.y - landingPosition.y;
    if (shipInfo.verticalSpeed < -35) {
      return 4;
    }
    if (shipInfo.verticalSpeed < -25) {
      return 3;
    }
    return 0;
  }
}