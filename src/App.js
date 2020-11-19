import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class DecisionApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      options: [],
      questionStore: []
    }

    this.anOption = this.anOption.bind();
    this.handleSubmit = this.handleSubmit.bind();
    this.handleInputChange = this.handleInputChange.bind();
    this.handleOptionChange = this.handleOptionChange.bind();
    this.checkAndUpdateQuestionStore = this.checkAndUpdateQuestionStore.bind();
  }

  anOption = () => {
    let randomNumber = Math.floor(Math.random() * this.state.options.length);
    return randomNumber;
  }

  handleInputChange = (event) => {
    this.setState({ question: event.target.value })
  }

  handleOptionChange = (event) => {
    let key = event.target.name
    let optionsarray = this.state.options
    optionsarray[key] = event.target.value

    this.setState({ options: optionsarray })
    console.log(this.state.options)
  }

  checkAndUpdateQuestionStore = (newValue) => {
    let initialArray = this.state.questionStore;
    let newQuestion = {};

    initialArray.forEach((element) => {

      if (element.value === newValue) {
        newQuestion = {
          value: element.value,
          count: element.count++
        }
      }
      else {
        newQuestion = {
          value: newValue,
          count: 1
        }
      }
    })

    initialArray.push(newQuestion);

    this.setState({
      questionStore: [...this.state.questionStore, initialArray]
    })
  };

  handleSubmit = (event) => {
    alert("The decision to your question " + this.state.question + " is " + this.state.options[this.anOption()]);

    this.checkAndUpdateQuestionStore(this.state.question);
    event.preventDefault();
  }

  runPopularityCheck = () => {

    let greatestCount = 0;
    let greatestQuestion = "";

    if (this.state.questionStore.length > 0) {
      this.state.questionStore.forEach((element) => {
        if (greatestCount < element.count) {
          greatestCount = element.count;
          greatestQuestion = element.value;
        } 
        else {
          // do nothing
        }
      });

      alert("Most asked question is: " + greatestQuestion + " which was asked " + greatestCount + " times");
    }
    else {
      alert("No question entered yet!!!");
      return;
    }
  }

  render() {
    return (
      <div>
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1>Anchor Decision Maker</h1>
        </header>

        <form className="decisionapp" onSubmit={this.handleSubmit}>
          <h2>Let Us Help You Decide Today</h2>

          <div className="questionholder">
            <p>Please enter your question:</p>
            <input required type="text" placeholder="Enter Question..." question={this.state.question} onChange={this.handleInputChange} />
          </div>

          <div className="optionholder">
            <p>Enter your options:</p>
            <input type="text" required placeholder="Option 1..." name="0" value={this.state.options[0]} onChange={this.handleOptionChange} /><br />
            <input type="text" required placeholder="Option 2..." name="1" value={this.state.options[1]} onChange={this.handleOptionChange} /><br />
            <input type="text" required placeholder="Option 3..." name="2" value={this.state.options[2]} onChange={this.handleOptionChange} /><br />
            <input type="text" required placeholder="Option 4..." name="3" value={this.state.options[3]} onChange={this.handleOptionChange} /><br />
            <input type="text" required placeholder="Option 5..." name="4" value={this.state.options[4]} onChange={this.handleOptionChange} />
          </div>

          <div>
            <p>click to get decision!</p>
            <input type="submit" id="button" />
            <input type="reset" id="button" />
            <input id="button" type="button" value="Check Popularity" onClick={this.runPopularityCheck} />
          </div>

        </form>
        <footer>Decision Maker App by Muo Sophia 2020</footer>
      </div>

    )
  }
}

export default DecisionApp;