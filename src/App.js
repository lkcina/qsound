import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      events: []
    };

    this.editLibrary = this.editLibrary.bind(this);
  }

  editLibrary(array) {
    this.setState({library: array});
  }

  render() {
    return (
      <div id="app">
        My React App!
        <Library library={this.state.library}/>
      </div>
    );
  }
};

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.addAudioFile = this.addAudioFile.bind(this);
  }

  addAudioFile() {
  }

  render() {
    return (
      <div id="library">
        <h2>Library</h2>
        <div class="toolbar">
          <button >+ Audio File</button>
        </div>
      </div>
    );
  }
}

export default App;
