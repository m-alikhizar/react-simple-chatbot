import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Input from 'react-enhanced-form'
import ChatBot from 'react-simple-chatbot'


const Result = (props) => {
  console.log(props)
  return <div>{props.weight() / (props.height() * props.height())}</div>
}

class App extends Component {
  constructor(props) {
    super(props)

    this.getHeight = this.getHeight.bind(this)
    this.getWeight = this.getWeight.bind(this)

    this.state = {
      steps: [
        {
          id: 'hello',
          message: 'Hello!',
          trigger: 'weight'
        },
        {
          id: 'weight',
          message: 'What is your weight? (lbs)',
          trigger: 'weightinput',
        },
        {
          id: 'weightinput',
          user: true,
          validator: weight => {
            if(parseInt(weight) > 0) {
              this.state.weight = weight;
              return true
            } return false
          },
          trigger: 'height',
        },
        {
          id: 'height',
          message: `and height (inches)?`,
          trigger: 'heightinput'
        },
        {
          id: 'heightinput',
          user: true,
          trigger: 'calc',
          validator: height => {
            if(parseInt(height) > 0) {
              this.state.height = height;
              return true
            } return false

          }
        },
        {
          id: 'calc',
          message: 'Calculating BMI ... ',
          trigger: 'result',
        },
        {
          id: 'result',
          component: <Result height={this.getHeight} weight={this.getWeight}/>
        }
      ]
    }
  }

  getHeight() {
    return this.state.height * 0.025;
  }

  getWeight() {
    return this.state.weight * 0.45;
  }

  render() {

    const style = {
      default: { width: 400 },
      onFocus: { border: '1px solid green' },
      onError: { border: '1px solid red '},
    }

    return (
      <div className="App">
        <ChatBot
          steps={this.state.steps}
          floating={false}
          botDelay={1000}
          customDelay={1000}
          customStyle={{background: '#e0e0e0'}}
          footerStyle={{borderTop: '1px solid #e0e0e0'}}
          headerTitle={'BMI Calculator'}
          contentStyle={{background: '#f7f7f7'}} />
      </div>
    );
  }
}

export default App;
