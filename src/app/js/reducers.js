import {
  SET_STRATEGY,
  SET_VOCAB_COUNT,
  REQUEST_VOCAB,
  FETCH_VOCAB_SUCCESS,
  SET_LANGUAGE,
  FETCH_PROMPT_SUCCESS,
  SET_TRANSLATED_TEXT,
  TOGGLE_TRANSLATION_DISPLAY,
  fetchVocab
} from './actions';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

const initialState = 'Describe a word';
const initialLangState = 'french';
const initialVocabState = {
  isFetching: false,
  vocab: {}
}
const initialTranslationState = '';
const initialPromptState = {type: 'question', prompt: ""};
const initialTranslationDisplayState = false;

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

export function adjectiveCount(state = 0, action) {
  switch (action.type) {
    case SET_VOCAB_COUNT:
      if (action.vocabType === 'adjective') {
        return action.count;
      } else {
        return state;
      }
    default:
      return state;
  }
}

function parseVocabTypes(vocabState, action) {
  console.log(action);
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
    case 'adjectives':
      return Object.assign({}, vocabState, {
        adjectives: action.vocab
      });
    default:
      return vocabState;
  }
}

export function prompt(state = initialPromptState, action) {
  switch (action.type) {
    case FETCH_PROMPT_SUCCESS:
      return action.prompt;
    default:
      return state;
  }
}

export function isPlainPrompt(state = false, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_PROMPT_SUCCESS:
      return action.prompt.type === 'translate'
    default:
      return state;
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

export function lang(state = initialLangState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.lang;
    default:
      return state;
  }
}

export function translation(state = initialTranslationState, action) {
  switch (action.type) {
    case SET_TRANSLATED_TEXT:
      return action.response;
    default:
      return state;
  }
}

export function showTranslation(state = initialTranslationDisplayState, action) {
  switch (action.type) {
    case TOGGLE_TRANSLATION_DISPLAY:
      return action.show;
    default:
      return state;
  }
}

const reducers = combineReducers({
  activeStrategy,
  verbCount,
  nounCount,
  adverbCount,
  adjectiveCount,
  vocab,
  lang,
  prompt,
  showTranslation,
  translation,
  isPlainPrompt
});

export const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);
