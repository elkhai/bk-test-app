import { Operator, map, mutate } from 'overmind';
import { response, deal } from '../api/types';
import { firstBy } from 'thenby';
import { dateToNumber } from '../../utils/dateToNumber';

export const sortHistory: () => Operator<response, deal[]> = () =>
  map(function sortHistory(_, resp: response) {
    return resp.deals
      ? resp.deals.sort(
          firstBy(
            (a, b) => dateToNumber(b.finishDate) - dateToNumber(a.finishDate)
          ).thenBy((a, b) => b.profit - a.profit)
        )
      : [];
  });

export const chooseDeals: () => Operator<deal[], Array<deal[]>> = () =>
  map(function chooseDeals(_, deals) {
    const maxPages = 2;
    const maxNegativeDeals = 2;
    const maxSameAssets = 2;
    const minGoodDeals = 1;
    const existInPages: Array<{ [key: string]: number }> = [{}];
    const negativeDeals: Array<number> = [0];
    const goodDeals: Array<number> = [0];
    const pages: Array<deal[]> = [[]];
    let page = 0;
    for (const deal of deals) {
      // create new page
      if (pages[page].length === 10) {
        page += 1;
        if (page === maxPages) {
          break;
        }
        existInPages.push({});
        pages.push([]);
        negativeDeals.push(0);
        goodDeals.push(0);
      }
      // move to next iteration if we have max quantity of same assets
      if (
        existInPages[page][deal.asset] &&
        existInPages[page][deal.asset] === maxSameAssets
      ) {
        continue;
      }
      // move to next iteration if we have max quantity of negative deals
      if (deal.profit.indexOf('-') !== -1) {
        if (negativeDeals[page] === maxNegativeDeals) {
          continue;
        }
        negativeDeals[page] += 1;
      } else {
        // more than 100
        if (deal.profit.indexOf('.') === 3) {
          goodDeals[page] += 1;
        }
      }
      // if last item on page and we dont have positive deals, move next
      if (pages[page].length === 9 && goodDeals[page] < minGoodDeals) {
        continue;
      }

      pages[page].push(deal);
      if (existInPages[page][deal.asset]) {
        existInPages[page][deal.asset] += 1;
      } else {
        existInPages[page][deal.asset] = 1;
      }
    }
    return pages;
  });

export const saveDeals: () => Operator<Array<deal[]>> = () =>
  mutate(function saveDeals({ state }, pages) {
    state.history.pages = pages;
  });
