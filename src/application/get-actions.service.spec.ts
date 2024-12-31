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

    it('reach the nearest reachable protein', () => {
        const turnInfo = new FakeTurnReader([
            '(A) (W) (O) (O) (W) (A)',
            '(O) (W) (O) (O) (R) (W)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (O) (O) (O) (O) (O)'
        ]).getTurnInfo();
        const turnInfo1 = new FakeTurnReader([
            '(A) (W) (O) (O) (W) (A)',
            '(O) (W) (O) (N) (R) (W)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (O) (O) (O) (O) (O)'
        ]).getTurnInfo();
        const turnInfo2 = new FakeTurnReader([
            '(A) (W) (O) (O) (W) (A)',
            '(O) (W) (N) (N) (R) (W)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (O) (O) (O) (O) (O)'
        ]).getTurnInfo();
        const turnInfo3 = new FakeTurnReader([
            '(A) (W) (O) (O) (W) (A)',
            '(O) (W) (N) (N) (R) (W)',
            '(O) (W) (N) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (O) (O) (O) (O) (O)'
        ]).getTurnInfo();
        const turnInfo4 = new FakeTurnReader([
            '(A) (W) (O) (O) (W) (A)',
            '(O) (W) (N) (N) (R) (W)',
            '(O) (W) (N) (O) (O) (O)',
            '(O) (W) (N) (O) (O) (O)',
            '(O) (W) (O) (O) (O) (O)',
            '(O) (O) (O) (O) (O) (O)'
        ]).getTurnInfo();
        const service = new GetActionsService(new FakeGameGateway({
            turns: [turnInfo, turnInfo1, turnInfo2, turnInfo3, turnInfo4]
        }))

        const actions = service.execute();
        expect(actions).toHaveLength(1)
        let firstDestination = new Position(3, 1);
        expect(actions[0]).toEqual(new ActionGrow(turnInfo.grid.getCell(new Position(4,1)).organ!, firstDestination))
        const actions1 = service.execute();
        expect(actions1).toHaveLength(1)
        let secondDestination = new Position(2, 1);
        expect(actions1[0]).toEqual(new ActionGrow(turnInfo1.grid.getCell(firstDestination).organ!, secondDestination))
        const actions2 = service.execute();
        expect(actions2).toHaveLength(1)
        let thirdDestination = new Position(2, 2);
        expect(actions2[0]).toEqual(new ActionGrow(turnInfo2.grid.getCell(secondDestination).organ!, thirdDestination))
        const actions3 = service.execute();
        expect(actions3).toHaveLength(1)
        let fourthDestination = new Position(2, 3);
        expect(actions3[0]).toEqual(new ActionGrow(turnInfo3.grid.getCell(thirdDestination).organ!, fourthDestination))
        const actions4 = service.execute();
        expect(actions4).toHaveLength(1)
        //here i expect he turn left because he is reaching (0,0) (he don't grow without goal)
        expect(actions4[0]).toEqual(new ActionGrow(turnInfo4.grid.getCell(fourthDestination).organ!, new Position(2, 4)))
    });

    it(`grow without goal if any protein can be reached (take empty cells)`, () => {
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