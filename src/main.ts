/**
 * Grow and multiply your organisms to end up larger than your opponent.
 **/
import {testGameReader} from "../tests/fixtures";
import {ProductionReader} from "./production-game-reader";
import {GameReader} from "./interfaces";

// @ts-ignore
let gameReader: GameReader = testGameReader ?? new ProductionReader()

const gridSize = gameReader.getInitialization()

while (true) {

    const turnInformation = gameReader.getTurnInfo(gridSize)

    for (let i = 0; i < turnInformation.requiredActionsCount; i++) {


        console.log('WAIT');

    }
}
