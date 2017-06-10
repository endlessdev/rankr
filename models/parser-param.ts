import { RankType } from './rank-type';
/**
 * Created by jade on 29/04/2017.
 */

export interface ParserParam {
  type: RankType;
  url: string;
  querySelector: string;
  parserSelector: Function;
}
