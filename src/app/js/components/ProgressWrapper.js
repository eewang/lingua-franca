import React from 'react';

export const ProgressWrapper = React.createClass({
  componentDidMount() {
    this.props.onLoad();
  },

  formatTimestamp(datetime) {
    var dateInt = Date.parse(datetime);
    var date = new Date(dateInt);
    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
  },

  renderResponses() {
    return this.props.allResponses.map((response) => {
      return (
        <div className="response">
          <label className="response-label">Prompt</label>
          <div className="response-date">CREATED: {this.formatTimestamp(response.created_at)}</div>
          <div className="response-prompt">{response.prompt}</div>
          <div className="response-vocab">{response.vocab}</div>
          <label className="response-label">Response</label>
          <div className="response-text">{response.text}</div>
        </div>
      )
    });
  },

  render() {
    return (
      <div>
        {this.renderResponses()}
      </div>
    )
  }
});
