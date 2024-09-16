import './App.css';
import EventTimeline from "./EventTimeline.js";
import Library from "./Library.js";
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
          id: "start",
          name: "Start",
          notes: ""
        },
        {
          id: "end",
          name: "End",
          notes: ""
        }
      ],
      eventStart: {
        id: "start",
        name: "Start",
        notes: ""
      },
      activeEvent: {
        id: "end",
        name: "End",
        notes: ""
      },
      cues: [],
      static: []
    };

    this.editLibrary = this.editLibrary.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.triggerEvent = this.triggerEvent.bind(this);
    this.setEventStart = this.setEventStart.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
    this.editEvents = this.editEvents.bind(this); 
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
    console.log(this.state.events.indexOf(this.state.activeEvent));
    if (this.state.activeEvent.id === "end") {
      console.log("End of event timeline");
      this.setState({mode: "create", activeEvent: this.state.eventStart});
      return;
    } else if (this.state.activeEvent.id === "start") {
      console.log("Triggering " + this.state.activeEvent.name + " and advancing to " + this.state.events[1].name);
      this.setState({activeEvent: this.state.events[1]});
    } else {
      console.log("Triggering " + this.state.activeEvent.name + " and advancing to " + this.state.events[this.state.events.indexOf(this.state.activeEvent) + 1].name);
      this.setState({activeEvent: this.state.events[this.state.events.indexOf(this.state.activeEvent) + 1]});
    }
  };

  editEvents(array) {
    this.setState({events: array});
    console.log(this.state.events);
  }

  render() {
    return (
      <div id="app">
        <Library library={this.state.library} editLibrary={this.editLibrary} />
        <EventTimeline events={this.state.events} mode={this.state.mode} toggleMode={this.toggleMode} setEventStart={this.setEventStart} eventStart={this.state.eventStart} activeEvent={this.state.activeEvent} setActiveEvent={this.setActiveEvent} triggerEvent={this.triggerEvent} editEvents={this.editEvents} editEventId={this.editEventId} newEvent={this.newEvent} deleteEvent={this.deleteEvent}/>
      </div>
    );
  }
};



export default App;
