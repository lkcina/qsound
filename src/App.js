import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [
        {
          id: "action-adventure-demo",
          name: "Action_Adventure_Demo.wav",
          src: "test-library/Action_Adventure_Demo.wav",
          type: "audio/wav"
        },
        {
          id: "theme-loop",
          name: "Theme Loop.wav",
          src: "test-library/Theme Loop.mp3",
          type: "audio/mpeg"
        }
    ],
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
    this.playAudioFile = this.playAudioFile.bind(this);
  }

  addAudioFile() {

  }

  playAudioFile() {
      
  }

  render() {
    return (
      <div id="library">
        <h2>Library</h2>
        <div class="toolbar">
          <input type="file" />
        </div>
        <div class="audio-file-container">
          {this.props.library.map(audioFile => (
            <AudioFile id={audioFile.id} name={audioFile.name} src={audioFile.src}/>
          ))}
        </div>          
      </div>
    );
  }
}

const AudioFile = (props) => {
  return (
    <div class="audio-file">
      <p>{props.name}</p>
      <audio controls>
        <source src={props.src} type={props.type}/>
      </audio>
    </div>
  );
}

export default App;
