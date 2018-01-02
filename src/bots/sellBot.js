// @flow

import { oneOf } from "../random";
import type {
  StockData,
  TraderWoPass,
  StockLOB
} from "../toy-stock-market-client-node";

export default function sellBot(stockData: StockData, trader: TraderWoPass) {
  const stockName = oneOf(Object.keys(stockData));
  const lob: StockLOB = stockData[stockName];
  const numberOFSharesOwned: number = trader.owns[stockName] || 0;
  if (numberOFSharesOwned === 0) {
    return [];
  }
  const price = (lob.bids[0] && lob.bids[0].price) || 1000;
  const quant = 1;
  return [["ask", stockName, price, quant]];
}
