import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case ADD_QUESTION_DECK :
      const {response} = action
      return {
        ...state,
        [response.keyDeck]:{
          ...state[response.keyDeck],
          questions: [...state[response.keyDeck].questions, response.question]
        }
      }
    default :
      return state
  }
}

export default decks