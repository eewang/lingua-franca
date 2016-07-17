import { connect } from 'react-redux';
import { ProgressWrapper } from '../components/ProgressWrapper';
import { fetchProgress } from '../actions';

const mapStateToProps = (state) => {
  return {
    allResponses: state.allResponses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(fetchProgress());
    }
  }
}

const ActiveProgressWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressWrapper)

export default ActiveProgressWrapper
