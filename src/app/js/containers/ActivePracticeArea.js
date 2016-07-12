import { connect } from 'react-redux';
import { PracticeArea } from '../components/PracticeArea';

const mapStateToProps = (state, ownProps) => {
  return {
    vocab: state.vocab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: () => {
      return null;
    }
  }
}

const ActivePracticeArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticeArea)

export default ActivePracticeArea;
