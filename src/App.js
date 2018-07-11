import React, { Component } from 'react';
import PropTypes from 'prop-types'
import bracket from './crochet.png'


const containerStyles = {
  display : "flex",
  //alignItems : "center",
  //border : "1px solid pink"
}

const fixedWrapperStyles = {
  height : "30px",
  position : "relative",
  overflow : "hidden",
  //border : "1px solid blue"
}

const mobileWrapperStyles = {
  position : "relative",
  top : "0px",
  //border : "1px solid red"
}

const imgStyles = (rotated) => ({
  height : "30px",
  width : "auto",
  transform : rotated ? 'rotate(180deg)' : 'none',
})

const textStyles = {
  height : "30px",
  display : "flex",
  alignItems : "center",
  justifyContent : "center",
  fontSize : "20px",
  //border : "1px solid yellow"
}

const Container = ({children}) => <span style={containerStyles}> {children} </span>
const Img = ({src, alt, rotated}) => <img style={imgStyles(rotated)} src={src} alt={alt} />
const FixedWrapper = ({children}) => <div style={fixedWrapperStyles}> {children} </div>
const MobileWrapper = ({children}) => <div style={mobileWrapperStyles}> {children} </div>
const Text = ({children}) => <div style={textStyles}> {children} </div>

class App extends Component {
  render() {
    return (
      <Container>
        <Img src={bracket} alt='#'/>
        <FixedWrapper>
          <MobileWrapper>
            {this.props.texts.map((item, index) => (
              <Text key={'scrolling-text'+index}>{item}</Text>
            ))}
          </MobileWrapper>
        </FixedWrapper>
        <Img src={bracket} alt='#' rotated/>
      </Container>
    );
  }
}

App.propTypes = {
  texts : PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired
}

export default App;
