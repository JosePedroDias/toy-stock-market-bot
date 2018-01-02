// @flow

import { anInt, oneOf } from "../random";
import type {
  StockData,
  TraderWoPass,
  StockLOB
} from "../toy-stock-market-client-node";

/*
does a random bid/ask
 */
export default function randomBot(stockData: StockData, trader: TraderWoPass) {
  const actionName = oneOf(["ask", "bid"]);
  const stockName = oneOf(Object.keys(stockData));
  const price = 10 + anInt(60);
  const quant = 1 + anInt(4);

  return [[actionName, stockName, price, quant]];
}
