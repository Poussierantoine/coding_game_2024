import {FakeReadlineProvider} from '../../common/readline-abstraction';
import {GameInformation, GameInformationGateway} from './GameInformationGateway';

export class FakeGameInformationGateway extends GameInformationGateway {
  private fixture?: GameInformation;
  constructor() {
    super(new FakeReadlineProvider());
  }

  getGameInformation() {
    if(!this.fixture) {
      throw new Error('feed the damn gateway asshole');
    }
    return this.fixture;
  }

  feed(fixture: GameInformation) {
    this.fixture = fixture;
  }
}
