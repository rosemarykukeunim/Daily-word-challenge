// ===============================
// DAILY WORD CHALLENGE
// ===============================

// The word for today's game
const answer = "APPLE";

// Game settings
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

// Game state
let currentRow = 0;
let currentGuess = "";

// Get elements from the page
const rows = document.querySelectorAll(".row");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");


// ===============================
// KEYBOARD
// ===============================

keyboard.addEventListener("click", function (event) {

  const button = event.target;

  if (button.tagName !== "BUTTON") {
    return;
  }

  const key = button.textContent;

  if (key === "ENTER") {
    submitGuess();
  }

  else if (key === "⌫") {
    deleteLetter();
  }

  else {
    addLetter(key);
  }

});


// ===============================
// ADD LETTER
// ===============================

function addLetter(letter) {

  // Don't allow more than 5 letters
  if (currentGuess.length >= WORD_LENGTH) {
    return;
  }

  // Don't allow typing after the game ends
  if (currentRow >= MAX_ATTEMPTS) {
    return;
  }

  currentGuess += letter;

  updateRow();

}


// ===============================
// DELETE LETTER
// ===============================

function deleteLetter() {

  if (currentGuess.length === 0) {
    return;
  }

  currentGuess = currentGuess.slice(0, -1);

  updateRow();

}


// ===============================
// UPDATE BOARD
// ===============================

function updateRow() {

  const tiles = rows[currentRow].querySelectorAll(".tile");

  tiles.forEach(function (tile, index) {

    if (currentGuess[index]) {
      tile.textContent = currentGuess[index];
    } else {
      tile.textContent = "";
    }

  });

}


// ===============================
// SUBMIT GUESS
// ===============================

function submitGuess() {

  // Check if the player entered 5 letters
  if (currentGuess.length !== WORD_LENGTH) {

    showMessage("Enter a 5-letter word.");

    return;
  }

  const tiles = rows[currentRow].querySelectorAll(".tile");

  checkGuess(tiles);

}


// ===============================
// CHECK THE GUESS
// ===============================

function checkGuess(tiles) {

  const guess = currentGuess.toLowerCase();
  const answerLetters = answer.toLowerCase().split("");

  let correctLetters = 0;

  // First check correct positions
  for (let i = 0; i < WORD_LENGTH; i++) {

    const letter = guess[i];

    if (letter === answerLetters[i]) {

      tiles[i].style.background = "#06d6a0";
      tiles[i].style.color = "#ffffff";
      tiles[i].style.borderColor = "#06d6a0";

      correctLetters++;

      answerLetters[i] = null;
    }

  }


  // Then check letters in the wrong position
  for (let i = 0; i < WORD_LENGTH; i++) {

    const letter = guess[i];

    // Skip letters already marked correct
    if (letter === answer.toLowerCase()[i]) {
      continue;
    }

    const letterIndex = answerLetters.indexOf(letter);

    if (letterIndex !== -1) {

      tiles[i].style.background = "#ffd166";
      tiles[i].style.color = "#ffffff";
      tiles[i].style.borderColor = "#ffd166";

      answerLetters[letterIndex] = null;

    } else {

      tiles[i].style.background = "#8d99ae";
      tiles[i].style.color = "#ffffff";
      tiles[i].style.borderColor = "#8d99ae";

    }

  }


  // Check if player won
  if (correctLetters === WORD_LENGTH) {

    showMessage("🎉 You got it!");

    disableKeyboard();

    return;
  }


  // Move to next row
  currentRow++;

  currentGuess = "";


  // Check if player has used all attempts
  if (currentRow >= MAX_ATTEMPTS) {

    showMessage("The word was " + answer + ".");

    disableKeyboard();

  }

}


// ===============================
// MESSAGE
// ===============================

function showMessage(text) {

  message.textContent = text;

}


// ===============================
// DISABLE KEYBOARD
// ===============================

function disableKeyboard() {

  const buttons = keyboard.querySelectorAll("button");

  buttons.forEach(function (button) {

    button.disabled = true;

  });

}