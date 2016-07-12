import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import classNames from 'classnames';
import { store } from './js/reducers';
import ActiveStrategy from './js/containers/ActiveStrategy';
import ActiveVocabSelector from './js/containers/ActiveVocabSelector';
import ActivePracticeArea from './js/containers/ActivePracticeArea';
import { fetchVocab } from './js/actions';

require('./css/style.css');

const Practice = React.createClass({
  strategies() {
    return this.props.strategies.map((strategy, index) => {
      return (
        <ActiveStrategy label={strategy} key={index}/>
      );
    });
  },

  render() {
    return (
      <div className='strategies'>
        {this.strategies()}
      </div>
    );
  }
});

const VocabForm = React.createClass({
  render() {
    return (
      <div>
        <h2>Create Vocabulary</h2>
        <form action="/create_vocab" method="POST">
          <div className="create-vocab-field">
            Word: <input type="text" name="word"></input>
          </div>
          <div className="create-vocab-field">
            Gender: <input type="text" name="gender"></input>
          </div>
          <div className="create-vocab-field">
            Translation: <input type="text" name="translation"></input>
          </div>
          <div className="create-vocab-field">
            Type
            <select name="type">
              <option value="verb">Verb</option>
              <option value="noun">Noun</option>
              <option value="adverb">Adverb</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
});

const NavItem = React.createClass({
  render() {
    return (
      <a className={this.props.classes} href={this.props.path}>{this.props.label}</a>
    )
  }
});

const NavBar = React.createClass({
  navItems() {
    return [
      {path: '/',         label: 'home'},
      {path: '/admin',    label: 'admin'},
      {path: '/practice', label: 'practice'},
      {path: '/progress', label: 'progress'}
    ];
  },

  classes(index) {
    return classNames('nav-item', {
      'first': index == 0
    })
  },

  renderNavItems() {
    return this.navItems().map((item, index) => {
      return (
        <NavItem label={item.label} path={item.path} classes={this.classes(index)}/>
      );
    })
  },

  render() {
    return (
      <div className="nav">
        {this.renderNavItems()}
      </div>
    )
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

  welcomeMessage() {
    if (!this.props.children) {
      return (
        <div>Hello! Welcome to Lingua Franca!</div>
      )
    } else {
      return null;
    }
  },

  render() {
    return (
      <Provider store={store}>
        <div>
          <NavBar/>
          {this.welcomeMessage()}
          {this.props.children}
        </div>
      </Provider>
    )
  }
});

const ConfigureStrategy = React.createClass({
  onClick() {
    store.dispatch(fetchVocab('verbs', store.getState().verbCount));
    store.dispatch(fetchVocab('nouns', store.getState().nounCount));
    store.dispatch(fetchVocab('adverbs', store.getState().adverbCount));
  },

  fetchVocabTypes() {
    // TODO: Fetch from server
    return ['verb', 'noun', 'adverb'];
  },

  render() {
    return (
      <div className='vocab-configure'>
        {this.fetchVocabTypes().map((label) => {
          return <ActiveVocabSelector label={label} vocabType={label}/>
        })}
        <span className='fetch-vocab' onClick={this.onClick}>Start</span>
      </div>
    )
  }
});

const PracticeWrapper = React.createClass({
  fetchStrategies() {
    // TODO: Fetch from server
    return ['Describe a word', 'Answer a prompt', 'Tell a story'];
  },

  render() {
    return (
      <div className='practice-wrapper'>
        <Practice strategies={this.fetchStrategies()}/>
        <ConfigureStrategy/>
        <ActivePracticeArea/>
      </div>
    )
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/admin" component={VocabForm}/>
      <Route path="/practice" component={PracticeWrapper}/>
    </Route>
  </Router>
), document.getElementById('container'));

// render(<App/>, document.getElementById('container'));
// render(<VocabForm/>, document.getElementById('vocab-form'));
