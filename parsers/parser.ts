import { NewsContent } from './news-content';

export interface Parser {
  getNewsContent(newsURL: string): Promise<NewsContent>;
  getNewsList(searchKeyword: string, page: number): Promise<[any]>;
}
