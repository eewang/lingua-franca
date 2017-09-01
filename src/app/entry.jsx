import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import classNames from 'classnames';
import { store } from './js/reducers';
import ActiveStrategy from './js/containers/ActiveStrategy';
import ActivePracticeArea from './js/containers/ActivePracticeArea';
import ActiveVocabArea from './js/containers/ActiveVocabArea';
import ActiveProgressWrapper from './js/containers/ActiveProgressWrapper';
import SelectPrompt from './js/containers/SelectPrompt';
import ActiveTagArea from './js/containers/ActiveTagArea';
import ActiveQuizletWrapper from './js/containers/ActiveQuizletWrapper';
import { setLanguage, fetchPrompt, fetchProgress } from './js/actions';

require('./css/style.css');

const Practice = React.createClass({
  strategies() {
    return this.props.strategies.map((strategy, index) => {
      return (
        <ActiveStrategy label={strategy.label} slug={strategy.slug} key={index}/>
      );
    });
  },

  // TODO: Move to a server call
  prompts() {
    return [
      "Live anywhere in the world, where would you live?",
      "Go anyplace for Christmas, where would you go?",
      "Go on a road trip with any person (dead or alive), who would you choose and where would you go?"
    ]
  },

  randomPrompt() {
    return this.prompts()[Math.floor(Math.random() * this.prompts().length)];
  },

  renderPrompts() {
    return (
      <div>{this.randomPrompt()}</div>
    )
  },

  getNewPrompt() {
    store.dispatch(fetchPrompt(store.getState().activeStrategy));
  },

  render() {
    return (
      <div className='strategies'>
        {this.strategies()}
        <span className="new-prompt-btn" onClick={this.getNewPrompt}>Shuffle</span>
        <div className="strategy-prompts">
          <SelectPrompt/>
        </div>
      </div>
    );
  }
});

const PromptForm = React.createClass({
  render() {
    return (
      <div>
        <h2>Create Question Prompt</h2>
        <form action="/create_prompt" method="POST">
          <div className="input-wrapper">
            <label className="input-label">Type:</label>
            <select name="type">
              <option value="describe">Describe a Phrase</option>
              <option value="answer">Answer a Question</option>
              <option value="tell">Tell a Story</option>
              <option value="translate">Translate a Sentence</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Language:</label>
            <select name="lang">
              <option value="french">Francais</option>
              <option value="english">English</option>
              <option value="spanish">Espanol</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Prompt:</label>
            <input type="text" name="prompt" className="text-input"></input>
          </div>
          <div>
            <ActiveTagArea/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
});

const VocabForm = React.createClass({
  render() {
    return (
      <div>
        <h2>Create Vocabulary</h2>
        <form action="/create_vocab" method="POST">
          <div className="input-wrapper">
            <label className="input-label">Word:</label>
            <input type="text" name="word" className="text-input"></input>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Gender:</label>
            <input type="text" name="gender"></input>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Translation:</label>
            <input type="text" name="english" className="text-input"></input>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Type:</label>
            <select name="type">
              <option value="verb">Verb</option>
              <option value="noun">Noun</option>
              <option value="adverb">Adverb</option>
              <option value="adjective">Adjective</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Language:</label>
            <select name="language">
              <option value="french">French</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
});

const AdminWrapper = React.createClass({
  render() {
    return (
      <div>
        <VocabForm/>
        <PromptForm/>
      </div>
    )
  }
})

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
      {path: '/',         label: 'Home'},
      {path: '/admin',    label: 'Admin'},
      {path: '/practice', label: 'Practice'},
      {path: '/progress', label: 'Progress'},
      {path: '/quizlet',  label: 'Quizlet'},
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

const PracticeWrapper = React.createClass({
  fetchStrategies() {
    // TODO: Fetch from server
    return [
      {slug: 'describe', label: 'Describe a phrase'},
      {slug: 'answer', label: 'Answer a question'},
      {slug: 'tell', label: 'Tell a story'},
      {slug: 'translate', label: 'Translate a sentence'}
    ];
  },

  render() {
    return (
      <div className='practice-wrapper'>
        <Practice strategies={this.fetchStrategies()}/>
        <ActiveVocabArea/>
        <ActivePracticeArea/>
      </div>
    )
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/admin" component={AdminWrapper}/>
      <Route path="/practice" component={PracticeWrapper}/>
      <Route path="/progress" component={ActiveProgressWrapper}/>
      <Route path="/quizlet" component={ActiveQuizletWrapper}/>
    </Route>
  </Router>
), document.getElementById('container'));

// render(<App/>, document.getElementById('container'));
// render(<VocabForm/>, document.getElementById('vocab-form'));
