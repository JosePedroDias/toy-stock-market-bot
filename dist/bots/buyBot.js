"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buyBot;

var _random = require("../random");

function buyBot(stockData, trader) {
  const stockName = (0, _random.oneOf)(Object.keys(stockData));
  const lob = stockData[stockName];
  const price = lob.asks[0] && lob.asks[0].price || 0;
  if (price === 0) {
    return [];
  }
  const quant = 1;
  return [["bid", stockName, price, quant]];
}