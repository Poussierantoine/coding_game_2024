import {Position} from '../domain/Position';
import {MarsLanderGateway, ShipInfo} from './marsLanderGateway';

export class TestMarsLanderGateway implements MarsLanderGateway {
  private landInfo: Position[] = [];
  private shipInfos: ShipInfo[] = [];
  getLandInfo() {
    return this.landInfo;
  }

  getShipInfo() {
    const shipInfo = this.shipInfos.shift();
    console.log(shipInfo);
    if(!shipInfo) {
      throw new Error('No more ship info');
    }
    return shipInfo;
  }

  feedLandInfo(landInfo: Position[]) {
    this.landInfo = landInfo;
  }

  feedShipInfos(shipInfos: ShipInfo[]) {
    this.shipInfos = shipInfos;
  }
}