import {LandingService} from './landing-service';
import {Position} from '../domain/Position';

describe('LandingService', () => {
  const landingOptions = {
    maxSpeed: 10,
    gravityAcceleration: 1,
    initialSpeed: 0,
  };

  const landingService = new LandingService(landingOptions);

  it('doesn\'t use power if the destination is far', () => {
    const shipPosition = new Position(0, 100);
    const landingPosition = new Position(0, 0);
    const shipInfo = {
      position: shipPosition,
      horizontalSpeed: 0,
      verticalSpeed: 0,
      fuel: 1000,
      rotationAngle: 0,
      power: 0,
    };
    const power = landingService.getPowerForTurn(shipInfo, landingPosition);
    expect(power).toEqual(0);
  });

  it('use power to limit the acceleration over a 25 speed', () => {
    const shipPosition = new Position(0, 100);
    const landingPosition = new Position(0, 0);
    const shipInfo = {
      position: shipPosition,
      horizontalSpeed: 0,
      verticalSpeed: -26,
      fuel: 1000,
      rotationAngle: 0,
      power: 0,
    };
    const power = landingService.getPowerForTurn(shipInfo, landingPosition);
    expect(power).toEqual(3);
  });

  it('use max power if the acceleration is over 35', () => {
    const shipPosition = new Position(0, 100);
    const landingPosition = new Position(0, 0);
    const shipInfo = {
      position: shipPosition,
      horizontalSpeed: 0,
      verticalSpeed: -36,
      fuel: 1000,
      rotationAngle: 0,
      power: 0,
    };
    const power = landingService.getPowerForTurn(shipInfo, landingPosition);
    expect(power).toEqual(4);
  });
});