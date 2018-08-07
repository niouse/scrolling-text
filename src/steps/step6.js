import React, { Component } from 'react';
import PropTypes from 'prop-types'

const defaultparams = {
  vy : 1,
  deltaT : 3000,
  fontSize : 20,
  height : 30,
}

const _ScrollingText = (userParams) => {
  
  const params = {...defaultparams, ...userParams}
  
  if(params.height < params.fontSize) {
    let err = new Error()
    err.message = `
      Error in ScrollingText component due to bad parameters.
      parameter 'height' can't be inferior to parameter 'fontSize'.
      current value for height is: ${params.height}
      current value for fontSize is : ${params.fontSize}
      `
     throw err
  }

  if(params.height % params.vy !== 0) {
    let err = new Error()
    err.message = `
      Error in ScrollingText component due to bad parameters.
      parameter 'vy' should by a multiplier of parameter 'height'.
      current value for vy is: ${params.vy}
      current value for fontSize is : ${params.height}
     `
     throw err
  }

  const fixedWrapperStyles = {
    height: params.height.toString()+'px',
    position: "relative",
    overflow: "hidden",
    display : "inline-block",
  }

  const movingWrapperStyles = {
    position: "relative",
    top: "0px",
    display : "inline-block"
  }

  const textStyles = {
    height: params.height.toString()+'px',
    fontSize: params.fontSize.toString()+'px',
  }

  class ScrollingText extends Component {
    constructor(props) {
      super(props)
      this.movingElRef = React.createRef()
      this.animation = null
      this.inc = 0
      this.repeat = null
      this.steps = 0
      this.actualTop = 0
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
      // One step has been completed => repeat after a delay
      if (this.inc === params.height/params.vy) {
        this.inc = 0
        this.steps += 1
        window.cancelAnimationFrame(this.animation)
        this.repeat = window.setTimeout(this.moveText, params.deltaT)
        return
      }
      
      const newTop = this.actualTop - params.vy
      this.movingElRef.current.style.top = newTop.toString() + 'px'
      this.inc += 1
      this.actualTop=newTop
      this.animation = window.requestAnimationFrame(this.moveText)
    }
 
    render() {
      const newTexts = this.props.texts.slice(0)
      newTexts.push(this.props.texts[0])
      return (
          <div style={{...fixedWrapperStyles, ...this.props.fixedWrapperStyles}}>
            <div ref={this.movingElRef}  style={{...movingWrapperStyles, ...this.props.movingWrapperStyles}}>
              {newTexts.map((item, index) => (
                <div key={'scrolling-text' + index} style={{...textStyles, ...this.props.textStyles}}>{item}</div>
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
    fixedWrapperStyles: PropTypes.object,
    movingWrapperStyles: PropTypes.object,
    textStyles: PropTypes.object,
  }

  return ScrollingText
}

export default _ScrollingText;
