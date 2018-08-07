import React, { Component } from 'react';
import PropTypes from 'prop-types'

const fixedWrapperStyles = {
  height: '30px',
  position: "relative",
  overflow: "hidden",
  display: "inline-block",
}

const movingWrapperStyles = {
  position: "relative",
  top: "0px",
  display: "inline-block"
}

const textStyles = {
  height: '30px',
  fontSize: '24px',
}

class ScrollingText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={fixedWrapperStyles}>
        <div style={movingWrapperStyles}>
          {this.props.texts.map((item, index) => (
            <div
              key={'scrolling-text' + index}
              style={textStyles}>
              {item}
            </div>
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
