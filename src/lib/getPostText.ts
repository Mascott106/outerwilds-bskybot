import lang_en from './lang_en.json' assert { type: 'json' };

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default async function getPostText() {
  // Generate the text for your post here. You can return a string or a promise that resolves to a string

  var gotText = false;
  var selectNum;
  var quoteText;
  var confirmedQuoteText;

  // selects quote number in bounds and checks if it is less than 301 characters
  while (!gotText) {
    selectNum = getRandomInt(2901);
    quoteText = lang_en[selectNum][0]

    console.log("quoteText");

    if (quoteText.length < 301) {
      confirmedQuoteText = quoteText       //TODO add quotes around text??? will need to set bounds to 299 just in case
      gotText = true;
      } else {
        console.log("quote too long");
      }
  }

  return confirmedQuoteText;
}