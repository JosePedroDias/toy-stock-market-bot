"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sellBot;

var _random = require("../random");

function sellBot(stockData, trader) {
  const stockName = (0, _random.oneOf)(Object.keys(stockData));
  const lob = stockData[stockName];
  const numberOFSharesOwned = trader.owns[stockName] || 0;
  if (numberOFSharesOwned === 0) {
    return [];
  }
  const price = lob.bids[0] && lob.bids[0].price || 1000;
  const quant = 1;
  return [["ask", stockName, price, quant]];
}