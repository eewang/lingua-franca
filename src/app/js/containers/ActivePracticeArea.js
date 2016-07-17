import { connect } from 'react-redux';
import { PracticeArea } from '../components/PracticeArea';
import { postResponse, translateText, toggleTranslation } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    vocab: state.vocab,
    lang: state.lang,
    prompt: state.prompt.prompt,
    translation: state.translation,
    showTranslation: state.showTranslation,
    isPlainPrompt: state.isPlainPrompt
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: () => {
      return null;
    },
    onSubmitText: (text, prompt, vocab) => {
      dispatch(postResponse(text, prompt, vocab));
    },
    translateText: (text) => {
      dispatch(translateText(text));
      dispatch(toggleTranslation(true))
    },
    hideTranslation: (show) => {
      dispatch(toggleTranslation(show))
    },
  }
}

const ActivePracticeArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticeArea)

export default ActivePracticeArea;
