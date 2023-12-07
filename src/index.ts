import Bot from "./lib/bot.js";
import getPostText from "./lib/getPostText.js";
import * as fs from "fs";

const text = await Bot.run(getPostText);

console.log(`[${new Date().toISOString()}] Posted: "${text}"`);
