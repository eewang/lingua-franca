import React from 'react';
import classNames from 'classnames';
import { activateStrategy } from '../actions';

export const PracticeStrategy = React.createClass({
  onClick() {
    return this.props.onStrategyClick(this.props.label);
  },

  classes() {
    return classNames('practice-strategy', {
      'active': this.props.active
    })
  },

  render() {
    return (
      <div className={this.classes()} onClick={this.onClick}>{this.props.label}</div>
    );
  }
});
