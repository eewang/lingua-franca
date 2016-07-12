import React from 'react';
import classNames from 'classnames';

export const PracticeArea = React.createClass({
  iterateVocab(vocabType) {
    return this.props.vocab.vocab[vocabType].map((obj) => {
      return (
        <div className='vocab-word'>{obj.word}</div>
      )
    })
  },

  renderVocabList(vocabType) {
    return (
      <div className='vocab-section'>
        <div className='vocab-type'>{vocabType}</div>
        {this.iterateVocab(vocabType)}
      </div>
    )
  },

  renderVocab() {
    return (
      <div className="vocab-list-container">
        {Object.keys(this.props.vocab.vocab).map((vocabType) => {
          return this.renderVocabList(vocabType);
        })}
      </div>
    )
  },

  inputAreaClasses() {
    return classNames('practice-input', {
      'no-vocab': Object.keys(this.props.vocab.vocab).length === 0
    })
  },

  render() {
    return (
      <div className="practice-area">
        {this.renderVocab()}
        <textarea className={this.inputAreaClasses()}></textarea>
      </div>
    )
  }
});
