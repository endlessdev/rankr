import {RankType} from "./RankType";
import {Rank} from "./Rank";
/**
 * Created by jade on 29/04/2017.
 */

export interface RankResult{
    resultCode : number;
    rankType : RankType;
    requestDate : Date;
    data : Rank[];
}