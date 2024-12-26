import {TurnInfoBuilder} from "../domain/TurnInfoBuilder";
import {GetActionsService} from "./get-actions.service";
import {FakeGameGateway} from "../infra/fake-game.gateway";
import {TurnInfo} from "../domain/TurnInfo";

describe('GetActionsService', () => {
    it('returns an array of the length of requiredActionCount', () => {
        const turnInfo = new TurnInfoBuilder({
            requiredActionCount: 2
        }).build()
        const service = new GetActionsService(new FakeGameGateway({
            turns: [turnInfo]
        }))
        expect(service.execute()).toHaveLength(2)
    });

    it('calls getInitialization only the first time execute is called', () => {
        class StubGameGateway extends FakeGameGateway {
            public getInitCalledCount: number = 0
            constructor(
                turns: TurnInfo[]
            ) {
                super({turns})
            }

            getInitialization() {
                this.getInitCalledCount++
                return super.getInitialization()
            }
        }

        let gateway = new StubGameGateway(
            [new TurnInfoBuilder({}).build(),new TurnInfoBuilder({}).build()]
        );
        const service = new GetActionsService(gateway)

        service.execute()
        service.execute()

        expect(gateway.getInitCalledCount).toEqual(1)
    });
});