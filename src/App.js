import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      events: []
    };
  }

  render() {
    return (
      <div id="app">
        My React App!
      </div>
    );
  }

};

export default App;
