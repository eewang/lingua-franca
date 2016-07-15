import React from 'react';
import classNames from 'classnames';
import { activateStrategy } from '../actions';
import ActiveVocabSelector from '../containers/ActiveVocabSelector';
import { store } from '../reducers';
import { fetchVocab } from '../actions';

const FetchVocabBtn = React.createClass({
  onClick() {
    store.dispatch(fetchVocab('verbs', store.getState().verbCount));
    store.dispatch(fetchVocab('nouns', store.getState().nounCount));
    store.dispatch(fetchVocab('adverbs', store.getState().adverbCount));
    store.dispatch(fetchVocab('adjectives', store.getState().adjectiveCount));
    store.dispatch(setLanguage(this.props.lang));
  },

  render() {
    return(
      <span className='fetch-vocab' onClick={this.onClick}>{this.props.lang}</span>
    )
  }
});

export const VocabArea = React.createClass({
  fetchVocabTypes() {
    // TODO: Fetch from server
    return ['verb', 'noun', 'adverb', 'adjective'];
  },

  classes() {
    return classNames('vocab-configure', {
      'hide': !this.props.prompt.length || this.props.isPlainPrompt
    })
  },

  render() {
    return (
      <div className={this.classes()}>
        {this.fetchVocabTypes().map((label) => {
          return <ActiveVocabSelector label={label} vocabType={label}/>
        })}
        <FetchVocabBtn lang='french'/>
        <FetchVocabBtn lang='english'/>
      </div>
    )
  }

});
