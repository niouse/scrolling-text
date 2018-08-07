import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ScrollingText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.texts.map((item, index) => (
            <div key={'scrolling-text' + index}>{item}</div>
          ))}
        </div>
      </div>
    );
  }
}

ScrollingText.propTypes = {
  texts: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
}


export default ScrollingText;
