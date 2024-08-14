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
          name: "Theme Loop.mp3",
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
    console.log("Adding audio file");
  }

  playAudioFile(event) {
    document.querySelectorAll("audio").forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    if (event.target.classList.contains("library-playing")) {
      event.target.classList.remove("library-playing");
    } else {
      document.querySelectorAll("library-playing").forEach(btn => {
        btn.classList.remove("library-playing");
      })
      event.target.classList.add("library-playing");
      event.target.parentElement.querySelector("audio").play();
    };
  }

  render() {
    return (
      <div id="library">
        <h2>Library</h2>
        <div className="toolbar">
          <button onClick={this.addAudioFile}>Add Audio File</button>
        </div>
        <div className="audio-file-container">
          {this.props.library.map(audioFile => (

            <AudioFile key={audioFile.id} id={audioFile.id} name={audioFile.name} src={audioFile.src} playAudioFile={this.playAudioFile}/>
          ))}
        </div>          
      </div>
    );
  }
}

const AudioFile = (props) => {
  return (
    <div className="audio-file">
      <button className="library-play-btn" onClick={props.playAudioFile}>Play</button>
      <p>{props.name}</p>
      <audio id={props.id} src={props.src} type={props.type}></audio>
      
    </div>
  );
}

export default App;
