import {Cell} from "./Cell";
import {Organ} from "./Organ";
import {ProteinType} from "../interfaces";
import {TurnInfo} from "./TurnInfo";

type TurnInfoBuilderProps = {
    grid: Cell[][]
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
            grid: props.grid ?? [],
            myProteins: props.myProteins ?? { A: 0 , B: 0, C: 0, D: 0 },
            oppProteins: props.oppProteins ?? { A: 0 , B: 0, C: 0, D: 0 },
            myOrgans: props.myOrgans ?? [],
            oppOrgans: props.oppOrgans ?? [],
            organMap: props.organMap ?? new Map(),
            requiredActionCount: props.requiredActionCount ?? 1
        }
    }

    build() {
        return new TurnInfo(this.props, {width: this.props.grid.length, height: this.props.grid[0]?.length ?? 0}, this.props.requiredActionCount)
    }
}




