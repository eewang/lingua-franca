import React from 'react';
import classNames from 'classnames';
import { activateStrategy, setLanguage } from '../actions';
import ActiveVocabSelector from '../containers/ActiveVocabSelector';
import { store } from '../reducers';
import { fetchVocab } from '../actions';

const FetchVocabBtn = React.createClass({
  onClick() {
    store.dispatch(fetchVocab('verb', store.getState().verbCount, this.props.lang));
    store.dispatch(fetchVocab('noun', store.getState().nounCount, this.props.lang));
    store.dispatch(fetchVocab('adverb', store.getState().adverbCount, this.props.lang));
    store.dispatch(fetchVocab('adjective', store.getState().adjectiveCount, this.props.lang));
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
        <FetchVocabBtn lang='spanish'/>
      </div>
    )
  }

});
