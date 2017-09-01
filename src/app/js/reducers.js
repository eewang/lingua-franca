import {
  SET_STRATEGY,
  SET_VOCAB_COUNT,
  REQUEST_VOCAB,
  FETCH_VOCAB_SUCCESS,
  SET_LANGUAGE,
  FETCH_PROMPT_SUCCESS,
  SET_TRANSLATED_TEXT,
  TOGGLE_TRANSLATION_DISPLAY,
  FETCH_PROGRESS_SUCCESS,
  FETCH_TAGS_SUCCESS,
  ACTIVATE_TAG,
  LOAD_QUIZLET,
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

function tags(state = [], action) {
  switch (action.type) {
    case FETCH_TAGS_SUCCESS:
      return action.tags;
    default:
      return state;
  }
}

function parseVocabTypes(vocabState, action) {
  console.log(action);
  switch (action.vocabType) {
    case 'verb':
      return Object.assign({}, vocabState, {
        verbs: action.vocab
      });
    case 'noun':
      return Object.assign({}, vocabState, {
        nouns: action.vocab
      });
    case 'adverb':
      return Object.assign({}, vocabState, {
        adverbs: action.vocab
      });
    case 'adjective':
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

export function activeTags(state = [], action) {
  switch (action.type) {
    case ACTIVATE_TAG:
      if (action.active) {
        if (state.includes(action.tagId)) {
          return state;
        } else {
          return state.slice(0).concat(action.tagId);
        }
      } else {
        return state.filter(v => v !== action.tagId);
      }
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

export function allResponses(state = [], action) {
  switch (action.type) {
    case FETCH_PROGRESS_SUCCESS:
      return action.responses;
    default:
      return state;
  }
}

export function quizletList(state = {}, action) {
  switch (action.type) {
    case LOAD_QUIZLET:
      return action.quizletList;
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
  isPlainPrompt,
  activeTags,
  tags,
  quizletList,
  allResponses
});

export const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);
