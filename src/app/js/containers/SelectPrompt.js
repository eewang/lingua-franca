import { connect } from 'react-redux';
import { Prompt } from '../components/Prompt';

const mapStateToProps = (state) => {
  return {
    prompt: state.prompt.prompt
  }
}

const SelectPrompt = connect(
  mapStateToProps
)(Prompt);

export default SelectPrompt;
