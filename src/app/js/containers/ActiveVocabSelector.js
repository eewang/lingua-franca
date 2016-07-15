import { connect } from 'react-redux';
import { VocabSelector } from '../components/VocabSelector';
import { setVocabCount } from '../actions';
import { store } from '../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    count: state[ownProps.vocabType + 'Count']
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (vocabType, count) => {
      console.log(vocabType + ' | ' + count)
      dispatch(setVocabCount(vocabType, count))
    }
  }
}

const ActiveVocabSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(VocabSelector)

export default ActiveVocabSelector;
