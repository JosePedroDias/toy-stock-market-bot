// @flow

import tsmc, {
  StockLOB,
  StockData,
  BidAskDataLOB
} from "./toy-stock-market-client-node";
import buyBot from "./bots/buyBot";
import sellBot from "./bots/sellBot";
import randomBot from "./bots/randomBot";

const BOTS_CONFIG = [
  ["bb1", "bb1", buyBot],
  //["sb1", "sb1", sellBot]
  ["rb1", "rb1", randomBot]
];

const PREFIX = "http://127.0.0.1:3030";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function lobLine(b: ?BidAskDataLOB): string {
  if (!b) {
    return "---";
  }
  return b.quantity + " at " + b.price;
}

function printLOBs(stockData: StockData) {
  const stockNames = Object.keys(stockData);
  const lines = stockNames.map(stock => {
    const lob: StockLOB = stockData[stock];
    return stock + ": " + lobLine(lob.bids[0]) + " / " + lobLine(lob.asks[0]);
  });
  console.log(lines.join("\n"));
}

function registerOrLogin(b) {
  return new Promise((resolve, reject) => {
    b.s
      .register(b.u, b.p, 1000)
      .then(() => {
        resolve();
      })
      .catch(ex => {
        b.s
          .login(b.u, b.p)
          .then(() => {
            resolve();
          })
          .catch(ex2 => {
            reject(ex2);
          });
      });
  });
}

async function topLevel() {
  const sm0 = tsmc(PREFIX);
  sm0.stockEventEmitter.on("*", ev => console.log("EVENT", ev));

  const STOCKS = await sm0.stocks();
  const STOCK_LOBS = {};

  const BOTS = BOTS_CONFIG.map(bc => {
    return {
      s: tsmc(PREFIX),
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
