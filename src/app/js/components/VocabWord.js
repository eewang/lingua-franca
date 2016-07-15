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

  displayWord() {
    if (this.props.lang === 'french') {
      return this.props.word.word;
    } else {
      return this.props.word.translation;
    }
  },

  displayTranslation() {
    if (this.props.lang === 'french') {
      return this.props.word.translation;
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
