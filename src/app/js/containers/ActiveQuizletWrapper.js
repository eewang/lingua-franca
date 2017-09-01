import { connect } from 'react-redux';
import { QuizletWrapper } from '../components/QuizletWrapper';
import { fetchQuizletList } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    quizletList: state.quizletList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQuizletClick: (setId) => {
      dispatch(fetchQuizletList(setId))
    }
  };
}

const ActiveQuizletWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizletWrapper);

export default ActiveQuizletWrapper;
