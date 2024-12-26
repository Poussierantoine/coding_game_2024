import {launch} from "./launch";
import {FakeGameGateway} from "./infra/fake-game.gateway";
import {TurnInfoBuilder} from "./domain/TurnInfoBuilder";

describe('launch', () => {
    it('do the actions', () => {
        const turnInfo = new TurnInfoBuilder({
            requiredActionCount: 1
        }).build()
        const gateway = new FakeGameGateway({
            turns: [turnInfo]
        })
        launch(gateway)

        expect(gateway.executedActions).toHaveLength(1)
    });
});