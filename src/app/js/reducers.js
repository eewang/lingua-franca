import { SET_STRATEGY, SET_VOCAB_COUNT, REQUEST_VOCAB, FETCH_VOCAB_SUCCESS, fetchVocab } from './actions';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

const initialState = 'Describe a word';

export function activeStrategy(state = initialState, action) {
  switch (action.type) {
    case SET_STRATEGY:
      return action.strategy;
    default:
      return state;
  }
}

export function verbCount(state = 0, action) {
  switch (action.type) {
    case SET_VOCAB_COUNT:
      if (action.vocabType === 'verb') {
        return action.count;
      } else {
        return state;
      }
    default:
      return state;
  }
}

export function nounCount(state = 0, action) {
  switch (action.type) {
    case SET_VOCAB_COUNT:
      if (action.vocabType === 'noun') {
        return action.count;
      } else {
        return state;
      }
    default:
      return state;
  }
}

export function adverbCount(state = 0, action) {
  switch (action.type) {
    case SET_VOCAB_COUNT:
      if (action.vocabType === 'adverb') {
        return action.count;
      } else {
        return state;
      }
    default:
      return state;
  }
}

const initialVocabState = {
  isFetching: false,
  vocab: {}
}

function parseVocabTypes(vocabState, action) {
  switch (action.vocabType) {
    case 'verbs':
      return Object.assign({}, vocabState, {
        verbs: action.vocab
      });
    case 'nouns':
      return Object.assign({}, vocabState, {
        nouns: action.vocab
      });
    case 'adverbs':
      return Object.assign({}, vocabState, {
        adverbs: action.vocab
      });
    default:
      return vocabState;
  }
}

export function vocab(state = initialVocabState, action) {
  switch (action.type) {
    case REQUEST_VOCAB:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_VOCAB_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        vocab: parseVocabTypes(state.vocab, action),
        lastUpdated: action.receivedAt
      })
    default:
      return state;
  }

}

const reducers = combineReducers({
  activeStrategy,
  verbCount,
  nounCount,
  adverbCount,
  vocab
});

export const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);
