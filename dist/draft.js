"use strict";

var _toyStockMarketClientNode = require("./toy-stock-market-client-node");

var _toyStockMarketClientNode2 = _interopRequireDefault(_toyStockMarketClientNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sm = (0, _toyStockMarketClientNode2.default)("http://127.0.0.1:3030");

async function topLevel() {
  sm.stockEventEmitter.on("*", ev => console.log("EVENT", ev));

  //log(sm.isLoggedIn());
  //const token = await sm.register("cenas", "cenas", 1000);
  //await sm.logout();

  console.log(1);

  const token = await sm.login("cenas", "cenas");
  console.log(2, "token", token);

  const trader = await sm.trader(token);
  console.log(3, "trader", trader);

  const stocks = await sm.stocks();
  console.log(4, "stocks", stocks);

  const lob = await sm.stockLOB("XYZ");
  console.log(5, "xyz lob", lob);

  const trans = await sm.transactions();
  console.log(6, "trans", trans);

  const stats = await sm.stats();
  console.log(7, "stats", stats);

  await sm.bid("XYZ", 1, 1); // stock price quant
  console.log(8, "bid");

  //await sm.ask('XYZ', 1, 1); // stock price quant
}

topLevel();