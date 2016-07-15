import React from 'react';

export const Prompt = React.createClass({
  render() {
    return (
      <div className="prompt-option">
        {this.props.prompt}
      </div>
    )
  }
});
