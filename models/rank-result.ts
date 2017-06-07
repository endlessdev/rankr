import {RankType} from "./rank-type";
import {Rank} from "./rank";
/**
 * Created by jade on 29/04/2017.
 */

export interface RankResult{
    resultCode : number;
    rankType : RankType;
    requestDate : Date;
    data : Rank[];
}