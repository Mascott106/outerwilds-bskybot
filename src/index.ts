import Bot from "./lib/bot.js";
import getPostText from "./lib/getPostText.js";

// PROD
//const text = await Bot.run(getPostText); 

// TESTING
const text = await Bot.run(getPostText, { dryRun: true });

console.log(`[${new Date().toISOString()}] Posted: "${text}"`);
