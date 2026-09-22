// Self-check: confirms click reply behavior.
import assert from "node:assert/strict";

import { getClickReply } from "../src/reply.ts";

assert.equal(getClickReply("Hello"), "Hi, there!");
assert.equal(getClickReply("goodMorning"), "Hi, there!");
assert.equal(getClickReply("Say hi now"), "Hi, there!");
assert.equal(getClickReply("How are you doing?"), "Fine, as usual! And you?");
assert.equal(getClickReply("HOW IS IT GOING?"), "Fine, as usual! And you?");
assert.equal(getClickReply("Bye"), "Cheers!");
assert.equal(getClickReply("Hasta la vista"), "Cheers!");
assert.equal(getClickReply("See you soon"), "Cheers!");
assert.equal(getClickReply("See ya soon"), "Cheers!");
assert.equal(getClickReply("test click"), 'Backend received: "test click"');

console.log("ok button-demo-back self-check passed");
