"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = randomBot;

var _random = require("../random");

/*
does a random bid/ask
 */
function randomBot(stockData, trader) {
  const actionName = (0, _random.oneOf)(["ask", "bid"]);
  const stockName = (0, _random.oneOf)(Object.keys(stockData));
  const price = 10 + (0, _random.anInt)(60);
  const quant = 1 + (0, _random.anInt)(4);

  return [[actionName, stockName, price, quant]];
}