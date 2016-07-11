import React from 'react';
import { render } from 'react-dom';
require('./css/style.css');

const PracticeOption = React.createClass({
  render() {
    return (
      <div>{this.props.label}: <input type='number'></input></div>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return {
      data: {}
    }
  },



  componentWillMount() {
    var self = this;
    fetch('/vocab').then((response) => {
      return response.json();
    }).then((json) => {
      self.setState({
        data: json
      });
    }).then(() => {
      console.log(self.state.data);
    });
  },

  render() {
    return (
      <div>
        <PracticeOption label="Verbs"/>
        <PracticeOption label="Nouns"/>
        <PracticeOption label="Adjectives"/>
      </div>
    );
  }
});

render(<App/>, document.getElementById('container'));
