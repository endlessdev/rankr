import {RankStatus} from "./rank-status";
export interface Rank {
    rank: number;
    value?: number;
    title: string;
    status?: RankStatus;
}