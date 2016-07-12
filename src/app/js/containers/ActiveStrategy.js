import { connect } from 'react-redux';
import { PracticeStrategy } from '../components/PracticeStrategy';
import { activateStrategy } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.label === state.activeStrategy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStrategyClick: (strategy) => {
      dispatch(activateStrategy(strategy))
    }
  }
}

const ActiveStrategy = connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticeStrategy)

export default ActiveStrategy;
