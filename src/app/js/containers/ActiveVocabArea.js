import { connect } from 'react-redux';
import { VocabArea } from '../components/VocabArea';
import { store } from '../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    prompt: state.prompt.prompt,
    isPlainPrompt: state.isPlainPrompt
  }
}

const ActiveVocabArea = connect(
  mapStateToProps
)(VocabArea);

export default ActiveVocabArea;
