// Self-check: confirms click reply behavior.
import assert from "node:assert/strict";

import { getClickReply } from "../src/reply.ts";

assert.equal(getClickReply("Hello"), "Hi, there!");
assert.equal(getClickReply("a goodMorning to you"), "Hi, there!");
assert.equal(getClickReply("Hi, how are you doing today?"), "Fine, as usual! And you?");
assert.equal(getClickReply("HOW'S IT GOING?"), "Fine, as usual! And you?");
assert.equal(getClickReply("Bye"), "Cheers!");
assert.equal(getClickReply("Hasta la vista, baby"), "Cheers!");
assert.equal(getClickReply("See ya later"), "Cheers!");
assert.equal(getClickReply("test click"), 'Backend received: "test click"');

console.log("ok button-demo-back self-check passed");
