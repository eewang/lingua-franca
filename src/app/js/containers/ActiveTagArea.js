import { connect } from 'react-redux';
import { TagArea } from '../components/TagArea';
import { loadTags } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    tags: state.tags
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTagAreaLoad: () => {
      dispatch(loadTags());
    }
  }
}

const ActiveTagArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagArea);

export default ActiveTagArea;
