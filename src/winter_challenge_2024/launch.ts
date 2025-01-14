import {GameGateway} from './interfaces';
import {GetActionsService} from './application/get-actions.service';
import {ActionWait} from './domain/ActionWait';


export const launch = (gameGateway: GameGateway, exitIfNoTurn: boolean = false, maxTurn: number = 100) => {
  const getActionsService = new GetActionsService();

  let should_exit = false;

  const gridSize = gameGateway.getInitialization();

  let actualTurn = 0;

  while (!should_exit && actualTurn < maxTurn) {
    const turn = gameGateway.getTurnInfo(gridSize);
    if(!turn){
      gameGateway.print('turn is null');
      if (exitIfNoTurn) {
        should_exit = true;
      } else {
        //in case of bug, but normally it will always read a turn
        gameGateway.doAction(new ActionWait());
      }
      actualTurn++;
      continue;
    }
    const actions = getActionsService.execute(turn);

    actions.map(action => gameGateway.doAction(action));
    actualTurn++;
  }
};