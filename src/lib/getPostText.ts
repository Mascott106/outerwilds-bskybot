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
  var testBool = false;

  // selects quote number in bounds and checks if it is less than 301 characters
  while (!gotText) {
    selectNum = getRandomInt(2901);


// USED FOR TESTING NONEXISTENT OBJECTS RETURNED    
    if (lang_en[selectNum]) {
      quoteText = lang_en[selectNum][0];
    } else {
      console.log(`Key ${selectNum} does not exist in quotes database!`)
      quoteText = "";
    }

// USED FOR TESTING SPECIFIC OBJECTS
      //    if (!testBool) {
      //     quoteText = lang_en[125][0];
      //     } else {
      //      quoteText = lang_en[selectNum][0];
      //  }

    quoteText = lang_en[selectNum][0];

    console.log(quoteText);

    console.log("Testing quote: \n \"" + quoteText + "\"")

    if (typeof quoteText == 'string' && quoteText.length < 301 && quoteText.length > 1) {
      confirmedQuoteText = quoteText      //TODO add quotes around text??? will need to set bounds to 299 just in case
      gotText = true;
    } else {
      console.log(quoteText);
      console.log("Quote outside of boundaries. Trying again.");
      // testBool = true;
    }
  }

  return confirmedQuoteText;
}