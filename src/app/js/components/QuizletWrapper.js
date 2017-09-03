import React from 'react';
import ActivePracticeArea from '../containers/ActivePracticeArea';

const sets = {
  "Regular -ER Verbs": '30807680',
  "Regular -IR Verbs": '34599901',
  "Regular -RE Verbs": '34600120',
  "Regular -RE Pronominal Verbs": '30901371',
  "Irregular Verbs": '89552143',
  "Irregular Past Participles": '90510759'
};

export const QuizletWrapper = React.createClass({

  loadQuizlet(name) {
    // debugger;
    return this.props.onQuizletClick(sets[name]);
  },

  renderQuizlet() {
    // TODO: Figure out how better to handle the null state
    if (Object.keys(this.props.quizletList).length) {
      const terms = this.props.quizletList.terms.map((item, index) => {
        return (
          <div>
            <div>{item.term}</div>
            <ActivePracticeArea indexCount={index}/>
          </div>
        )
      });
      return terms;
    } else {
      return '';
    }
  },

  renderQuizletSetOptions() {
    return Object.keys(sets).map((name) => {
      return (
        <div onClick={() => this.loadQuizlet(name)}>{name}</div>
      )
    })
  },

  render() {
    return (
      <div>
        <div>
          {this.renderQuizletSetOptions()}
        </div>
        <div className="quizlet-wrapper">{this.renderQuizlet()}</div>
      </div>
    );
  }

});
