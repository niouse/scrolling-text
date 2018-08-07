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
    this.movingElRef = React.createRef()
    this.actualTop = 0
  }

  componentDidMount() {
    this.moveText()
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation)
  }

  moveText = () => {
    const newTop = this.actualTop - 1
    this.movingElRef.current.style.top = newTop.toString() + 'px'
    this.actualTop = newTop
    this.animation = window.requestAnimationFrame(this.moveText)
  }


  render() {
    return (
      <div style={fixedWrapperStyles}>
        <div ref={this.movingElRef} style={movingWrapperStyles}>
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
