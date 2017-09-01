import React from 'react';

export const QuizletWrapper = React.createClass({

  loadQuizlet() {
    const setId = '34599901';
    // const setId = '30807680';
    // const setId = '30807680';

    return this.props.onQuizletClick(setId);
  },

  renderQuizlet() {
    // TODO: Figure out how better to handle the null state
    if (Object.keys(this.props.quizletList).length) {
      const terms = this.props.quizletList.terms.map((item) => {
        return (
          <div>{item.term}</div>
        )
      });
      return terms;
    } else {
      return '';
    }
  },

  render() {
    return (
      <div>
        <div onClick={this.loadQuizlet}>Load Quizlet Items</div>
        <div>{this.renderQuizlet()}</div>
      </div>
    );
  }

});
