import {launch} from './launch';
import {FakeGameGateway} from './infra/fake-game.gateway';
import {TurnInfoBuilder} from './domain/TurnInfoBuilder';
import {ActionWait} from './domain/ActionWait';

describe('launch', () => {
  it('do a wait if no turn found', () => {
    const gateway = new FakeGameGateway({
      turns: []
    });
    launch(gateway, false, 1);

    expect(gateway.executedActions).toEqual([new ActionWait()]);
  });

  it('do the actions', () => {
    const turnInfo = new TurnInfoBuilder({
      requiredActionCount: 1
    }).build();
    const gateway = new FakeGameGateway({
      turns: [turnInfo]
    });
    //exit gateway if no turns so no additionnal wait action
    launch(gateway, true, 1);

    expect(gateway.executedActions).toHaveLength(1);
  });
});