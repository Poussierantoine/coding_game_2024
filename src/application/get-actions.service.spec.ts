import {TurnInfoBuilder} from "../domain/TurnInfoBuilder";
import {GetActionsService} from "./get-actions.service";
import {FakeGameGateway, FakeTurnReader} from "../infra/fake-game.gateway";
import {TurnInfo} from "../domain/TurnInfo";
import {ActionGrow} from "../domain/ActionGrow";
import {Position} from "../domain/Position";

describe('GetActionsService', () => {

    it('get the actions for reaching the nearest A protein', () => {
        const firstTurnInfo = new FakeTurnReader([
            '(R) (O) (A)'
        ]).getTurnInfo();
        const secondTurnInfo = new FakeTurnReader([
            '(R) (N) (A)'
        ]).getTurnInfo();
        const service = new GetActionsService(new FakeGameGateway({
            turns: [firstTurnInfo, secondTurnInfo]
        }))
        const position10 = new Position(1, 0)

        const firstTurnActions = service.execute();
        expect(firstTurnActions).toHaveLength(1)
        expect(firstTurnActions[0]).toEqual(new ActionGrow(firstTurnInfo.playerOrgans[0], position10))
        const secondTurnActions = service.execute();
        expect(secondTurnActions).toHaveLength(1)
        expect(secondTurnActions[0]).toEqual(new ActionGrow(secondTurnInfo.grid.getCell(position10).organ!, new Position(2, 0)))

    });

    it('grow if there is no protein', () => {
        const turnInfo = new FakeTurnReader([
            '(R) (O)'
        ]).getTurnInfo();
        const service = new GetActionsService(new FakeGameGateway({
            turns: [turnInfo]
        }))
        const emptyCellPosition = new Position(1, 0)

        const actions = service.execute();
        expect(actions).toHaveLength(1)
        expect(actions[0]).toEqual(new ActionGrow(turnInfo.playerOrgans[0], emptyCellPosition))
    });

    it(`grow if the protein cannot be reached`, () => {
        const turnInfo = new FakeTurnReader([
            '(A) (W) (R) (O)'
        ]).getTurnInfo();
        const service = new GetActionsService(new FakeGameGateway({
            turns: [turnInfo]
        }))
        const emptyCellPosition = new Position(3, 0)

        const actions = service.execute();
        expect(actions).toHaveLength(1)
        expect(actions[0]).toEqual(new ActionGrow(turnInfo.playerOrgans[0], emptyCellPosition))
    });


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