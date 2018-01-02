"use strict";

var _toyStockMarketClientNode = require("./toy-stock-market-client-node");

var _toyStockMarketClientNode2 = _interopRequireDefault(_toyStockMarketClientNode);

var _buyBot = require("./bots/buyBot");

var _buyBot2 = _interopRequireDefault(_buyBot);

var _sellBot = require("./bots/sellBot");

var _sellBot2 = _interopRequireDefault(_sellBot);

var _randomBot = require("./bots/randomBot");

var _randomBot2 = _interopRequireDefault(_randomBot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BOTS_CONFIG = [["bb1", "bb1", _buyBot2.default],
//["sb1", "sb1", sellBot]
["rb1", "rb1", _randomBot2.default]];

const PREFIX = "http://127.0.0.1:3030";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function lobLine(b) {
  if (!b) {
    return "---";
  }
  return b.quantity + " at " + b.price;
}

function printLOBs(stockData) {
  const stockNames = Object.keys(stockData);
  const lines = stockNames.map(stock => {
    const lob = stockData[stock];
    return stock + ": " + lobLine(lob.bids[0]) + " / " + lobLine(lob.asks[0]);
  });
  console.log(lines.join("\n"));
}

function registerOrLogin(b) {
  return new Promise((resolve, reject) => {
    b.s.register(b.u, b.p, 1000).then(() => {
      resolve();
    }).catch(ex => {
      b.s.login(b.u, b.p).then(() => {
        resolve();
      }).catch(ex2 => {
        reject(ex2);
      });
    });
  });
}

async function topLevel() {
  const sm0 = (0, _toyStockMarketClientNode2.default)(PREFIX);
  sm0.stockEventEmitter.on("*", ev => console.log("EVENT", ev));

  const STOCKS = await sm0.stocks();
  const STOCK_LOBS = {};

  const BOTS = BOTS_CONFIG.map(bc => {
    return {
      s: (0, _toyStockMarketClientNode2.default)(PREFIX),
      u: bc[0],
      p: bc[1],
      b: bc[2],
      t: null
    };
  });

  await Promise.all(BOTS.map(b => registerOrLogin(b)));

  let t = 0;
  while (1) {
    console.log("\n+----------\nITERATION: %s\n", t);

    // update stock info for all to use
    for (let stock of STOCKS) {
      const lob = await sm0.stockLOB(stock);
      STOCK_LOBS[stock] = lob;
    }
    //console.log(JSON.stringify(STOCK_LOBS, null, 2));
    printLOBs(STOCK_LOBS);

    async function forEachBot(b) {
      console.log("\nBOT: %s", b.u);

      const trader = await b.s.trader();
      //console.log(trader);

      const actions = b.b(STOCK_LOBS, trader);
      console.log("ACTIONS", actions);

      for (let a of actions) {
        try {
          await b.s[a[0]](a[1], a[2], a[3]);
        } catch (ex) {
          console.error(ex);
        }
      }
    }

    for (let b of BOTS) {
      await forEachBot(b);
    }

    await sleep(1500);
    ++t;
  }
}

topLevel();