import { connect } from 'react-redux';
import { Tag } from '../components/Tag';
import { toggleTag } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    active: state.activeTags.includes(ownProps.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTagSelect: (id, active) => {
      dispatch(toggleTag(id, active));
    }
  }
}

const ActiveTag = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);

export default ActiveTag;
