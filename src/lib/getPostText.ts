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

  // THIS WILL SELECT THE NUMBER OF THE QUOTE
  while (!gotText) {
    selectNum = getRandomInt(2901);
    quoteText = lang_en[selectNum][0]

    if (quoteText.length < 300) {
      confirmedQuoteText = quoteText
      gotText = true;
    } else {
        selectNum = getRandomInt(2901);
        quoteText = lang_en[selectNum][0]
    }
  }

  return confirmedQuoteText;
}