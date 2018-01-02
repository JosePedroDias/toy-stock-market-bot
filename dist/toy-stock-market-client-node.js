"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (prefix) {
  return (0, _toyStockMarketClient2.default)({
    fetch: _nodeFetch2.default,
    EventSource: _eventsource2.default,
    EventEmitter: _events2.default,
    prefix
  });
};

var _toyStockMarketClient = require("toy-stock-market-client");

var _toyStockMarketClient2 = _interopRequireDefault(_toyStockMarketClient);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _eventsource = require("eventsource");

var _eventsource2 = _interopRequireDefault(_eventsource);

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }