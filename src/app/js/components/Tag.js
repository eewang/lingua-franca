import React from 'react';
import classNames from 'classnames';

export const Tag = React.createClass({
  classes() {
    return classNames('tag', this.props.tagColor, {
      'active': this.props.active
    });
  },

  toggleActiveState() {
    this.props.toggleTagSelect(this.props.id, !this.props.active);
  },

  render() {
    return (
      <span className={this.classes()} onClick={this.toggleActiveState}>
        {this.props.name}
      </span>
    )
  }
});
