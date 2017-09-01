import React from 'react';
import classNames from 'classnames';
import ActiveTag from '../containers/ActiveTag';

export const TagArea = React.createClass({
  componentDidMount() {
    this.props.onTagAreaLoad();
  },

  tagColor(type) {
    switch (type) {
      case 'verb':
        return 'blue';
      case 'noun':
        return 'red';
      case 'adjective':
        return 'green';
      case 'adverb':
        return 'black';
      default:
        return type;
    }
  },

  renderTags() {
    return this.props.tags.map((tag) => {
      return <ActiveTag name={tag.name} tagColor={this.tagColor(tag.type)} id={tag.id}/>
    });
  },

  render() {
    return (
      <div>
        {this.renderTags()}
      </div>
    )
  }
});
