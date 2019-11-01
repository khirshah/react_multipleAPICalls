import React from 'react';
import './App.css';
import dogdata from "./dogdata";

class App extends React.Component {

  state = {
    jsonph: "",
    github: ""
  }

  callRecusrion = () => {
    let html = this.handleRecursion(dogdata,'');
    return {__html: html };
  }

  handleRecursion(obj,htmlString) {
    htmlString += `<div class="container">`;
    for (let i of Object.keys(obj)) {
      htmlString += `<div class="container-row">`;
      if (typeof obj[i] == "object" && obj[i]!=null) {
        htmlString += `<div class="element">${i}:</div>`;
        htmlString = this.handleRecursion(obj[i],htmlString);
      }
      else {
        htmlString += `<div class="element">${i}:</div> <div class="element">${obj[i]}</div>`;
      }
      htmlString += "</div>";
    }
    htmlString += "</div>";
    return htmlString
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
      })
      .then(json => this.handleRecursion(json,""))
      .then(html => this.setState({jsonph: html }));
  }

  render () {
    return (
      <div className="App">
        <div>
          <h3>Loading data from local file</h3>
          <div dangerouslySetInnerHTML={this.callRecusrion()} />
        </div>
        <div>
          <h3>Loading data from jsonplaceholder</h3>
          <div dangerouslySetInnerHTML={{__html:this.state.jsonph}} />
        </div>
      </div>
    );
  };
}

export default App;
