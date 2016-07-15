import { connect } from 'react-redux';
import { PracticeStrategy } from '../components/PracticeStrategy';
import { activateStrategy, fetchPrompt } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.slug === state.activeStrategy,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStrategyClick: (strategy) => {
      dispatch(activateStrategy(strategy));
      dispatch(fetchPrompt(strategy));
    }
  }
}

const ActiveStrategy = connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticeStrategy);

export default ActiveStrategy;
