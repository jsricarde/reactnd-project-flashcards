import {submitDeck} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION_DECK = 'ADD_QUESTION_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

function addQuestionToDeck(response) {
  return {
    type: ADD_QUESTION_DECK,
    response,
  }
}

export function handleAddQuestionToDeck(question, keyDeck) {
  const response = {question, keyDeck}
  return (dispatch, getState) => {
    const decks = getState()
    const deck = Object.assign({}, decks[keyDeck]);
    deck.questions = [...deck.questions, question]
    submitDeck({deck, key: keyDeck}).then(()=>{
      return dispatch(addQuestionToDeck(response))
    })
  }
}