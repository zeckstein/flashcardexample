const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;


//randomize which flashcard shows
router.get('/', (req, res) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/flashcards/${flashcardId}?side=question`);
});


//flashcard route
router.get('/:id', (req, res) => {

  //handle query strings for card sides
  const { side } = req.query;
  const { id } = req.params;

  if (!side){
     return res.redirect(`/flashcards/${id}?side=question`);
  }
  const name = req.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];
  
  const templateData = {text, id, name};

  if (side === 'question') {
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
    templateData.hint = hint;
  } else if (side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }
  res.render('card', templateData);
});


module.exports = router;