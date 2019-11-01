import React from 'react';
import './App.css';
import dogdata from "./dogdata";

class App extends React.Component {

  state = {
    users: "",
    todos: ""
  }

  //method to direct local data to the converter method
  loadLocalData = () => {
    let html = this.jsonToHTML(dogdata,'');
    return {__html: html };
  }

  //class method to convert json to a string containing html code
  jsonToHTML = (obj,htmlString) => {
    //open container div for object (or object part in deeper levels)
    htmlString += `<div class="container">`;
    //iterate object's keys
    for (let i of Object.keys(obj)) {
      //open container row div
      htmlString += `<div class="container-row">`;
      //if current item is an object (and not jus null) - array is ok
      if (typeof obj[i] == "object" && obj[i]!=null) {
        //create an element div for the key
        htmlString += `<div class="element">${i}</div>`;
        //then call this funcion again and go to the deeper object level
        htmlString = this.jsonToHTML(obj[i],htmlString);
      }
      //if current item is a primitive type
      else {
        //create an element div pair for key and value
        htmlString += `<div class="element">${i}</div> <div class="element">${obj[i]}</div>`;
      }
      //close container row div
      htmlString += "</div>";
    }
    //end of for cycle close container div
    htmlString += "</div>";
    //return the HTML string to either one level up, or back to the caller function when finished
    return htmlString
  }

  //react lifecycle method where the json data is fetched
  componentDidMount() {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos/1'),
      fetch('https://jsonplaceholder.typicode.com/users/1')
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(jsons => jsons.map(i => this.jsonToHTML(i,"")))
    .then(htmls => this.setState({todos: htmls[0], users: htmls[1] }));
  }

  render () {
    return (
      <div className="App">
        <div>
          <h3>Loading data from local file</h3>
          <div dangerouslySetInnerHTML={this.loadLocalData()} />
        </div>
        <div>
          <h3>Loading data from jsonplaceholder - /todos/1 endpoint</h3>
          <div dangerouslySetInnerHTML={{__html:this.state.todos}} />
        </div>
        <div>
          <h3>Loading data from jsonplaceholder - /users/1 endpoint</h3>
          <div dangerouslySetInnerHTML={{__html:this.state.users}} />
        </div>
      </div>
    );
  };
}

export default App;
