const { describe, it } = require("node:test");

globalThis.describe = describe;
globalThis.it = it;

require("ts-node").register({ transpileOnly: true });
