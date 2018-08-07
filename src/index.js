import React from 'react';
import ReactDOM from 'react-dom';
import ScrollingText from './ScrollingText';

const texts1 = [
  "J'aime bien",
  "J'aime pas",
  "Je déteste",
]
const texts2 = [
  "js",
  "c++",
  "java",
]

const texts3 = [
  "enrichissant",
  "fatiguant",
  "excitant"
]

const options1 = {
  height:74,
  fontSize:64,
  containerStyles:{
    top: "16px",
  }
}

const Text1 = <ScrollingText texts={texts1} {...options1} />
const Text2 = <ScrollingText  texts={texts2} {...options1} vy={0.2}/>
const Text3 = <ScrollingText  texts={texts3} {...options1} vy={0.2} deltaT={0} containerStyles={{color:"red"}}/>


const Exemple1 = () => <div>
  <div style={{fontSize : "64px"}}>  {Text1} ça coder en {Text2} c'est très {Text3} </div>
</div>

ReactDOM.render(<Exemple1 />, document.getElementById('root'));

