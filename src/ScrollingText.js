import React, { Component } from 'react';
import PropTypes from 'prop-types'




  const containerStyles = {
    position: "relative",
    overflow: "hidden",
    display : "inline-block",
  }

  const movingWrapperStyles = {
    position: "relative",
    top: "0px",
    display : "inline-block"
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
      this.vy = props.vy
  
      if(props.height < props.fontSize) {
        let message = `
          Error in ScrollingText component due to bad parameters.
          parameter 'height' can't be inferior to parameter 'fontSize'.
          current value for height is: ${props.height}
          current value for fontSize is : ${props.fontSize}
          `
         console.warn(message)
      }
    
      if(props.height % props.vy !== 0 && props.height %(props.vy*10) !== 0) {
        let message = `
          Warning in ScrollingText component due to bad parameters.
          parameter 'vy' should by a multiplier of parameter 'height'.
          provided value for vy is: ${props.vy}
          current value for height is : ${props.height}
          Value of vy has been set to 1
         `
         console.warn(message)
         this.vy = 1
      }
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
      if (this.inc === this.props.height/this.vy) {
        this.inc = 0
        this.steps += 1
        window.cancelAnimationFrame(this.animation)
        this.repeat = window.setTimeout(this.moveText, this.props.deltaT)
        return
      }
      
      const newTop = this.actualTop - this.vy
      this.movingElRef.current.style.top = newTop.toString() + 'px'
      this.inc += 1
      this.actualTop=newTop
      this.animation = window.requestAnimationFrame(this.moveText)
    }
 
    render() {
      const newTexts = this.props.texts.slice(0)
      newTexts.push(this.props.texts[0])
      return (
          <div style={{
              ...this.props.containerStyles,
              ...containerStyles, 
              height: this.props.height+'px'
              }}>
            <div 
            ref={this.movingElRef}  
            style={movingWrapperStyles}>
              {newTexts.map((item, index) => (
                <div 
                    key={'scrolling-text' + index} 
                    style={{
                        height: this.props.height+'px',
                        fontSize: this.props.fontSize+'px',
                    }}>{item}</div>
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
    containerStyles: PropTypes.object,
    vy : PropTypes.number,
    deltaT : PropTypes.number,
    fontSize : PropTypes.number,
    height : PropTypes.number,
  }

  ScrollingText.defaultProps = {
    vy : 1,
    deltaT : 3000,
    fontSize : 20,
    height : 30,
  }

export default ScrollingText;
