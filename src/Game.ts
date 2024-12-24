import {Cell, IGame, Organ, ProteinType} from "./interfaces";

export class Game {
    private grid: Cell[][];
    private myProteins: { [key in ProteinType]: number };
    private oppProteins: { [key in ProteinType]: number };
    private myOrgans: Organ[];
    private oppOrgans: Organ[];
    private organMap: Map<number, Organ>;

    constructor(
        game: IGame
    ) {
        this.grid = game.grid
        this.myProteins = game.myProteins
        this.oppProteins = game.oppProteins
        this.myOrgans = game.myOrgans
        this.oppOrgans = game.oppOrgans
        this.organMap = game.organMap
    }
}
