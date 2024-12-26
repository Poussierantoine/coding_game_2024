import {testGameGateway} from "./fixtures";
import {ProductionGameGateway} from "./infra/production-game.gateway";
import {GameGateway} from "./interfaces";
import {launch} from "./launch";

// @ts-ignore
let gameGateway: GameGateway = testGameGateway ?? new ProductionGameGateway()

launch(gameGateway)