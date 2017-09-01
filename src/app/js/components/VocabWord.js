import React from 'react';
import classNames from 'classnames';

export const VocabWord = React.createClass({
  getInitialState() {
    return {
      active: false
    }
  },

  classes() {
    return classNames('vocab-word', {
      'active': this.state.active
    });
  },

  translationLang() {
    return this.props.lang !== 'english';
  },

  displayWord() {
    if (this.translationLang()) {
      return this.props.word.word;
    } else {
      // TODO: make this language neutral, so its only from-lang, to-lang
      return this.props.word.english;
    }
  },

  displayTranslation() {
    if (this.translationLang()) {
      return this.props.word.english;
    } else {
      return this.props.word.word;
    }
  },

  showTranslation() {
    this.setState({active: !this.state.active})
  },

  render() {
    return (
      <div className={this.classes()}>
        <div className='display-word' onClick={this.showTranslation}>{this.displayWord()}</div>
        <div className='display-translation'>{this.displayTranslation()}</div>
      </div>
    )
  }
})
