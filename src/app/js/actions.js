export const SET_STRATEGY = 'SET_STRATEGY';
export const SET_VOCAB_COUNT = 'SET_VOCAB_COUNT';
export const START_PRACTICE = 'START_PRACTICE';
export const REQUEST_VOCAB = 'REQUEST_VOCAB';
export const FETCH_VOCAB_SUCCESS = 'FETCH_VOCAB_SUCCESS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const REQUEST_PROMPT = 'REQUEST_PROMPT';
export const FETCH_PROMPT_SUCCESS = 'FETCH_PROMPT_SUCCESS';
export const SET_RESPONSE_TEXT = 'SET_RESPONSE_TEXT';
export const SET_TRANSLATED_TEXT = 'SET_TRANSLATED_TEXT';
export const TOGGLE_TRANSLATION_DISPLAY = 'TOGGLE_TRANSLATION_DISPLAY';
export const FETCH_PROGRESS_SUCCESS = 'FETCH_PROGRESS_SUCCESS';
export const POST_RESPONSE_SUCCESS = 'POST_RESPONSE_SUCCESS';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const ACTIVATE_TAG = 'ACTIVATE_TAG';
export const LOAD_QUIZLET = 'LOAD_QUIZLET';

export function activateStrategy(strategy) {
  return {
    type: SET_STRATEGY,
    strategy: strategy
  }
}

export function setVocabCount(vocabType, count) {
  return {
    type: SET_VOCAB_COUNT,
    vocabType: vocabType,
    count: count
  }
}

export function startPractice() {
  return {
    type: START_PRACTICE
  }
}

export function requestVocab() {
  return {
    type: REQUEST_VOCAB
  }
}

export function requestPrompt() {
  return {
    type: REQUEST_PROMPT
  }
}

export function fetchVocabSuccess(vocabType, json) {
  return {
    type: FETCH_VOCAB_SUCCESS,
    vocab: json,
    vocabType: vocabType,
    receivedAt: Date.now()
  }
}

export function fetchPromptSuccess(json) {
  return {
    type: FETCH_PROMPT_SUCCESS,
    prompt: json,
    receivedAt: Date.now()
  }
}

// export function fetchVocabFail() {
//
// }

export function fetchProgressSuccess(json) {
  return {
    type: FETCH_PROGRESS_SUCCESS,
    responses: json
  }
}

export function fetchTagsSuccess(json) {
  return {
    type: FETCH_TAGS_SUCCESS,
    tags: json.data
  }
}

export function setLanguage(lang) {
  return {
    type: SET_LANGUAGE,
    lang: lang
  }
}

export function fetchQuizletSuccess(json) {
  return {
    type: LOAD_QUIZLET,
    quizletList: json
  }
}

export function fetchPrompt(strategy) {
  return function(dispatch) {
    dispatch(requestPrompt());

    return fetch('api/random_prompt?type=' + strategy).then((resp) => {
      return resp.json();
    }).then((json) => {
      dispatch(fetchPromptSuccess(json));
    })
  }
}

export function setResponseText(text) {
  return {
    type: SET_RESPONSE_TEXT,
    response: text
  }
}

export function postResponseSuccess() {
  return {
    type: POST_RESPONSE_SUCCESS
  }
}

export function toggleTag(id, active) {
  return {
    type: ACTIVATE_TAG,
    tagId: id,
    active: active
  }
}

export function postResponse(text, promptId, vocab) {
  return function (dispatch) {
    return fetch('api/response?text=' + text + '&promptId=' + promptId, {
      method: 'post',
      body: JSON.stringify(vocab),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).then((resp) => {
      return resp.json();
    }).then((json) => {
      dispatch(postResponseSuccess());
    })
  }
}

export function fetchTranslatedTextSuccess(text) {
  return {
    type: SET_TRANSLATED_TEXT,
    response: text
  }
}

export function toggleTranslation(show) {
  return {
    type: TOGGLE_TRANSLATION_DISPLAY,
    show: show
  }
}

export function translateText(text) {
  return (dispatch) => {
    return fetch('api/translate?text=' + text).then((resp) => {
      return resp.json();
    }).then((json) => {
      var parsed = JSON.parse(json);
      dispatch(fetchTranslatedTextSuccess(parsed.text[0]));
    })
  }
}

export function fetchVocab(vocabType, vocabTypeCount, lang) {
  return function (dispatch) {
    dispatch(requestVocab());

    return fetch('api/vocab?type='+ vocabType + '&count=' + vocabTypeCount + '&lang=' + lang).then((resp) => {
      return resp.json();
    }).then((json) => {
      dispatch(fetchVocabSuccess(vocabType, json));
    })
  }
}

export function fetchProgress() {
  return (dispatch) => {
    return fetch('api/progress').then((resp) => {
      return resp.json();
    }).then((json) => {
      dispatch(fetchProgressSuccess(json));
    })
  }
}

export function loadTags() {
  return (dispatch) => {
    return fetch('api/tags').then((resp) => {
      return resp.json();
    }).then((json) => {
      dispatch(fetchTagsSuccess(json));
    })
  }
}

export function fetchQuizletList(setId) {
  const fetchURL = `fetch_quizlet?set_id=${setId}`;

  // Ex: https://api.quizlet.com/2.0/sets/30807680?client_id=2qZMs5stge&whitespace=1
  return (dispatch) => {
    return fetch(fetchURL).then((resp) => {
      return resp.json();
    }).then((json) => {
      var parsed = JSON.parse(json);
      dispatch(fetchQuizletSuccess(parsed));
    });
  }
}
