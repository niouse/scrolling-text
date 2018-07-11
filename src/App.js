import React, { Component } from 'react';
import PropTypes from 'prop-types'

const Container = (props) => <div>{props.children}</div>
const Img = (props) => <img src={props.src} alt={props.alt} />
const FixedWrapper = (props) => <div> {props.children} </div>
const MobileWrapper = (props) => <div> {props.children} </div>

class App extends Component {
  render() {
    return (
      <Container>
        <Img />
        <FixedWrapper>
          <MobileWrapper>
            {this.props.texts.map((item, index) => (
              <div>{item}</div>
            ))}
          </MobileWrapper>
        </FixedWrapper>
        <Img />
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
