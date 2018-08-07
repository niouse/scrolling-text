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
    this.inc = 0
    this.repeat
    this.steps
  }

  componentDidMount() {
    this.moveText()
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation)
    window.clearTimeout(this.repeat)
  }

  moveText = () => {
      // The end of the array is reached => reset position 
      if (this.steps === this.props.texts.length  ) {
        this.movingElRef.current.style.top = 0
        this.actualTop=0
        this.steps = 0
      }
    if (this.inc === 30) {
        this.inc = 0
        this.steps += 1
        window.cancelAnimationFrame(this.animation)
        this.repeat = window.setTimeout(this.moveText, 1000)
        return
      }
    const newTop = this.actualTop - 1
    this.movingElRef.current.style.top = newTop.toString() + 'px'
    this.inc += 1
    this.actualTop = newTop
    this.animation = window.requestAnimationFrame(this.moveText)
  }


  render() {
    const newTexts = this.props.texts.slice(0)
    newTexts.push(this.props.texts[0])
    return (
      <div style={fixedWrapperStyles}>
        <div ref={this.movingElRef} style={movingWrapperStyles}>
          {newTexts.map((item, index) => (
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
