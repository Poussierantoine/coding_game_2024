import {Organ} from "./Organ";
import {ProteinType} from "../interfaces";
import {TurnInfo} from "./TurnInfo";
import {Grid} from "./Grid";

type TurnInfoBuilderProps = {
    grid: Grid
    myProteins: { [key in ProteinType]: number }
    oppProteins: { [key in ProteinType]: number }
    myOrgans: Organ[]
    oppOrgans: Organ[]
    organMap: Map<number, Organ>;
    requiredActionCount: number;
}

export class TurnInfoBuilder {
    private readonly props: TurnInfoBuilderProps

    constructor(props: Partial<TurnInfoBuilderProps>) {
        this.props = {
            grid: props.grid ?? new Grid({width:0, height:0}),
            myProteins: props.myProteins ?? { A: 0 , B: 0, C: 0, D: 0 },
            oppProteins: props.oppProteins ?? { A: 0 , B: 0, C: 0, D: 0 },
            myOrgans: props.myOrgans ?? [],
            oppOrgans: props.oppOrgans ?? [],
            organMap: props.organMap ?? new Map(),
            requiredActionCount: props.requiredActionCount ?? 1
        }
    }

    build() {
        return new TurnInfo({
            turn: this.props,
            gridSize: {width: this.props.grid.width, height: this.props.grid.height},
            requiredActionCount: this.props.requiredActionCount
        })
    }
}




