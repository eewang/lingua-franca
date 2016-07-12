export const SET_STRATEGY = 'SET_STRATEGY';
export const SET_VOCAB_COUNT = 'SET_VOCAB_COUNT';
export const START_PRACTICE = 'START_PRACTICE';
export const REQUEST_VOCAB = 'REQUEST_VOCAB';
export const FETCH_VOCAB_SUCCESS = 'FETCH_VOCAB_SUCCESS';

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

export function fetchVocabSuccess(vocabType, json) {
  return {
    type: FETCH_VOCAB_SUCCESS,
    vocab: json,
    vocabType: vocabType,
    receivedAt: Date.now()
  }
}

// export function fetchVocabFail() {
//
// }

export function fetchVocab(vocabType, vocabTypeCount) {
  return function (dispatch) {
    dispatch(requestVocab());

    return fetch('api/' + vocabType + '?count=' + vocabTypeCount).then((resp) => {
      return resp.json();
    }).then((json) => {
      dispatch(fetchVocabSuccess(vocabType, json));
    })
  }
}
