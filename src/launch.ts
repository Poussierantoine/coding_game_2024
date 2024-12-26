import {GameGateway} from "./interfaces";
import {GetActionsService} from "./application/get-actions.service";


export const launch = (gameGateway: GameGateway) => {
    const getActionsService = new GetActionsService(gameGateway)

    let should_exit = false

    while (!should_exit) {
        const actions = getActionsService.execute()

        if(!actions.length){
            should_exit = true
        }

        actions.map(action => gameGateway.doAction(action))
    }
}