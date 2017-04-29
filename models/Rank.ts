import {RankStatus} from "./RankStatus";
export interface Rank {
    rank: number;
    value: number;
    title: string;
    status: RankStatus;
}