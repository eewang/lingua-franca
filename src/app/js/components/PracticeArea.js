import React from 'react';
import classNames from 'classnames';
import Quill from 'quill';
import { VocabWord } from './VocabWord';

const SpecialChar = React.createClass({
  onClick() {
    this.props.quill.focus()
    var currentText = this.props.quill.getText();
    var insertAt = this.props.quill.getSelection().start;
    this.props.quill.insertText(insertAt, this.props.char)
    this.props.quill.focus();
    this.props.quill.setSelection(insertAt + 1, insertAt + 1);
  },

  render() {
    return (
      <span className='char' onClick={this.onClick}>{this.props.char}</span>
    )
  }
});

export const PracticeArea = React.createClass({
  getInitialState() {
    return {
      quill: null
    };
  },

  showWord(wordObj) {
    // TODO: have lang determined via state-to-props in VocabWord
    return <VocabWord word={wordObj} lang={this.props.lang}/>
  },

  iterateVocab(vocabType) {
    return this.props.vocab.vocab[vocabType].map((wordObj) => {
      return this.showWord(wordObj);
    })
  },

  renderVocabList(vocabType) {
    return (
      <div className='vocab-section' key={vocabType}>
        <div className='vocab-type'>{vocabType}</div>
        {this.iterateVocab(vocabType)}
      </div>
    )
  },

  vocabListClasses() {
    return classNames('vocab-list-container', {
      'hide': this.hideVocabList()
    })
  },

  renderVocab() {
    return (
      <div className={this.vocabListClasses()}>
        {Object.keys(this.props.vocab.vocab).map((vocabType) => {
          return this.renderVocabList(vocabType);
        })}
      </div>
    )
  },

  inputAreaClasses() {
    return classNames({
      'practice-input': true,
      'quill-editor': true
    })
  },

  componentDidMount() {
    var quill = new Quill('.quill-editor', {
      formats: ['bold', 'italic'],
      theme: 'snow'
    });
    quill.addModule('toolbar', {
      container: '#toolbar'
    });
    this.setState({quill: quill});
  },

  hideVocabList() {
    return this.noVocab() || this.props.isPlainPrompt;
  },

  noVocab() {
    return !Object.keys(this.props.vocab.vocab).length
  },

  noPrompt() {
    return !this.props.prompt.length;
  },

  inputWrapperClasses() {
    return classNames('editor-wrapper', {
      'no-vocab': this.hideVocabList()
    })
  },

  practiceAreaClasses() {
    return classNames('practice-area', {
      'hide': this.noPrompt()
    })
  },

  toolbarSpecialCharacters() {
    return ['é', 'è', 'ê', 'à', 'â',  'î', 'ô', 'û', 'œ', 'ç'];
  },

  renderSpecialCharacterToolset() {
    return this.toolbarSpecialCharacters().map((char) => {
      return <SpecialChar char={char} quill={this.state.quill}/>
    });
  },

  submitText() {
    this.props.onSubmitText(this.state.quill.getText(), this.props.promptId, this.props.vocab.vocab);
  },

  translateText() {
    this.props.translateText(this.state.quill.getText());
  },

  renderActionBtn(label, onClick) {
    return (
      <span className="practice-area-action-btn" onClick={onClick}>{label}</span>
    )
  },

  translationClasses() {
    return classNames('translation-text', {
      visible: this.props.showTranslation
    });
  },

  toggleTranslationView() {
    this.props.hideTranslation(!this.props.showTranslation);
  },

  translationLabel() {
    if (this.props.showTranslation) {
      return "show";
    } else {
      return "hide";
    }
  },

  renderTranslation() {
    return (
      <div className='translation-wrapper'>
        <span className="close-translation" onClick={this.toggleTranslationView}>{this.translationLabel()}</span>
        <span className={this.translationClasses()}>{this.props.translation}</span>
      </div>
    )
  },

  render() {
    return (
      <div className={this.practiceAreaClasses()}>
        {this.renderVocab()}
        <div className={this.inputWrapperClasses()}>
          {this.renderTranslation()}
          <div id="toolbar">
            <span className='ql-format-group'>
              <button className="ql-bold ql-format-button"></button>
              <button className="ql-italic ql-format-button"></button>
            </span>
            {this.renderSpecialCharacterToolset()}
            {this.renderActionBtn('Submit', this.submitText)}
            {this.renderActionBtn('Translate', this.translateText)}
          </div>
          <div className={this.inputAreaClasses()}></div>
        </div>
      </div>
    )
  }
});
