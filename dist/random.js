"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anInt = anInt;
exports.oneOf = oneOf;
function anInt(n) {
  return Math.floor(n * Math.random());
}

function oneOf(arr) {
  const i = anInt(arr.length);
  return arr[i];
}