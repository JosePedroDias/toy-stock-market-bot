// @flow

import { oneOf } from "../random";
import type {
  StockData,
  TraderWoPass,
  StockLOB
} from "../toy-stock-market-client-node";

export default function buyBot(stockData: StockData, trader: TraderWoPass) {
  const stockName = oneOf(Object.keys(stockData));
  const lob: StockLOB = stockData[stockName];
  const price = (lob.asks[0] && lob.asks[0].price) || 0;
  if (price === 0) {
    return [];
  }
  const quant = 1;
  return [["bid", stockName, price, quant]];
}
