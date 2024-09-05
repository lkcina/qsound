import './App.css';
import EventTimeline from "./EventTimeline.js";
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "create",
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
      events: [
        {
          id: "1",
          name: "1",
          notes: ""
        },
        {
          id: "2",
          name: "2",
          notes: ""
        },
        {
          id: "end",
          name: "End",
          notes: ""
        }
      ],
      eventStart: {
        id: "end",
        name: "End",
        notes: ""
      },
      activeEvent: {
        id: "end",
        name: "End",
        notes: ""
      },
      cues: [],
      static: [],
      timer: 0
    };

    this.editLibrary = this.editLibrary.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.triggerEvent = this.triggerEvent.bind(this);
    this.setEventStart = this.setEventStart.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
  }

  editLibrary(array) {
    this.setState({library: array});
  }

  toggleMode() {
    if (this.state.mode === "present") {
      this.setState({mode: "create"});
      this.setState({activeEvent: this.state.eventStart});
      console.log(this.state.activeEvent);
    } else {
      this.setState({mode: "present", activeEvent: this.state.eventStart});
    };
  }

  setEventStart(event) {
    this.setState({eventStart: this.state.events.find(e => e.id === event.target.value)});    
  }

  setActiveEvent(event) {
    this.setState({activeEvent: this.state.events.find(e => e.id === event.target.value)});
    console.log(this.state.activeEvent);
  };

  triggerEvent() {
    if (this.state.activeEvent.id === "end") {
      console.log("End of event timeline");
      this.setState({mode: "create", activeEvent: this.state.eventStart});
      return;
    }
    if (this.state.mode === "create") {
      console.log("Triggering" + this.state.activeEvent.name);
      return
    } else {
      console.log("Triggering" + this.state.activeEvent.name + " and advancing to " + this.state.events[this.state.events.indexOf(this.state.activeEvent) + 1].name);
      this.setState({activeEvent: this.state.events[this.state.events.indexOf(this.state.activeEvent) + 1]});
    }
  }

  render() {
    return (
      <div id="app">
        My React App!
        <Library library={this.state.library} editLibrary={this.editLibrary} />
        <EventTimeline events={this.state.events} mode={this.state.mode} toggleMode={this.toggleMode} setEventStart={this.setEventStart} eventStart={this.state.eventStart} activeEvent={this.state.activeEvent} setActiveEvent={this.setActiveEvent} triggerEvent={this.triggerEvent}/>
      </div>
    );
  }
};

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.addAudioFile = this.addAudioFile.bind(this);
    this.playAudioFile = this.playAudioFile.bind(this);
    this.delAudioFile = this.delAudioFile.bind(this);
  }

  addAudioFile() {
    console.log("Adding audio file");
    // User selects file from file dialog, which is uploaded to project audio library and added to the library state
    
  }

  delAudioFile(event) {
    console.log("Deleting audio file");
    // User deletes audio file from library, which is removed from the project audio library and the library state
    this.props.editLibrary(this.props.library.filter(audioFile => audioFile.id !== event.target.parentElement.querySelector("audio").id));
  }

  playAudioFile(event) {
    document.querySelectorAll("audio").forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    if (event.target.classList.contains("library-playing")) {
      event.target.classList.remove("library-playing");
    } else {
      document.querySelectorAll(".library-playing").forEach(btn => {
        btn.classList.remove("library-playing");
      })
      event.target.classList.add("library-playing");
      event.target.parentElement.querySelector("audio").play();
    };
  }

  render() {
    return (
      <div id="library" className="window">
        <h2>Library</h2>
        <div className="toolbar">
          <button className="add-audio-btn" onClick={this.addAudioFile}>+</button>
        </div>
        <div className="audio-file-container">
          {this.props.library.map(audioFile => (

            <AudioFile key={audioFile.id} id={audioFile.id} name={audioFile.name} src={audioFile.src} playAudioFile={this.playAudioFile} delAudioFile={this.delAudioFile}/>
          ))}
        </div>          
      </div>
    );
  }
}

const AudioFile = (props) => {
  return (
    <div className="audio-file">
      <button className="library-play-btn" onClick={props.playAudioFile}>P</button>
      <p>{props.name}</p>
      <button className="library-del-btn" onClick={props.delAudioFile}>X</button>
      <audio id={props.id} src={props.src} type={props.type}></audio>
      
    </div>
  );
}

export default App;
