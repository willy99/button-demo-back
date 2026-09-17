// Self-check: confirms click reply behavior.
import assert from "node:assert/strict";

import { getClickReply } from "../src/reply.ts";

assert.equal(getClickReply("Hello"), "Hello there");
assert.equal(getClickReply("Say Hello now"), "Hello there");
assert.equal(getClickReply("Bye"), "Cheers!");
assert.equal(getClickReply("Say Bye now"), "Cheers!");
assert.equal(getClickReply("test click"), 'Backend received: "test click"');

console.log("ok button-demo-back self-check passed");
