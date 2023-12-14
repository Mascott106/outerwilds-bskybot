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
  //var testBool = false;

  // selects quote number in bounds and checks if it is less than 301 characters
  while (!gotText) {
    selectNum = getRandomInt(2901);
// USED FOR TESTING NONEXISTENT OBJECTS RETURNED    
// currently haven't deleted any entries, so this shouldn't appear
    if (!lang_en[selectNum]) {
      console.log(`Key ${selectNum} does not exist in quotes database! Setting quote to blank...`)
      quoteText = "";
    } else {
      quoteText = lang_en[selectNum][0];
    }

// USED FOR TESTING SPECIFIC OBJECTS
      //    if (!testBool) {
      //     quoteText = lang_en[125][0];
      //     } else {
      //      quoteText = lang_en[selectNum][0];
      //  }

    console.log("Testing quote number: " +selectNum + "\n\"" + quoteText + "\"")

    if (typeof quoteText == 'string' && quoteText.length < 301 && quoteText.length > 1) {
      console.log("Quote okay! Continuing...");
      confirmedQuoteText = quoteText;
      gotText = true; 
    } else if (quoteText.length < 1) {
      console.log("Quote too short. Trying again...");
      //testBool = true;
    } else if (quoteText.length > 300){
      console.log("Quote too long. Trying again...");
      //testBool = false;
    } else if (typeof quoteText != 'string'){
      console.log("Quote not a string. Trying again...");
      //testBool = false;
    } else {
      console.log("Quote not okay. Trying again...");
      //testBool = false;
    }
  }

  return confirmedQuoteText;
}