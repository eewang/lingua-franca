import React from 'react';

export const VocabSelector = React.createClass({
  onChange(event) {
    this.props.onChange(this.props.vocabType, event.target.value)
  },

  render() {
    return (
      <div className='vocab-option'>
        <span>{this.props.label}: </span><input type='number' className='vocab-input' onChange={this.onChange}></input>
      </div>
    )
  }
});
