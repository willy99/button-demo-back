// Self-check: confirms click reply behavior.
import assert from "node:assert/strict";

import { getClickReply } from "../src/reply.ts";

assert.equal(getClickReply("Hello"), "Hi, there!");
assert.equal(getClickReply("goodMorning, everyone"), "Hi, there!");
assert.equal(getClickReply("Say Hi now"), "Hi, there!");
assert.equal(getClickReply("How are you doing today?"), "Fine, as usual! And you?");
assert.equal(getClickReply("howIsItGoing?"), "Fine, as usual! And you?");
assert.equal(getClickReply("Bye"), "Cheers!");
assert.equal(getClickReply("Hasta la vista, baby"), "Cheers!");
assert.equal(getClickReply("See ya later"), "Cheers!");
assert.equal(getClickReply("test click"), 'Backend received: "test click"');

console.log("ok button-demo-back self-check passed");
