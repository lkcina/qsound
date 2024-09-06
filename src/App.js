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
    this.editEventName = this.editEventName.bind(this);
    this.editEventNotes = this.editEventNotes.bind(this);
    this.editEventId = this.editEventId.bind(this);
    this.newEvent = this.newEvent.bind(this);
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
  };

  editEventName(event) {
    let newEvents = [...this.state.events];
    newEvents[newEvents.findIndex(e => e.id === event.target.parentElement.id)].name = event.target.value;
    this.setState({events: newEvents});
  }

  editEventNotes(event) {
    let newEvents = [...this.state.events];
    newEvents[newEvents.findIndex(e => e.id === event.target.parentElement.id)].notes = event.target.value;
    this.setState({events: newEvents});
  }

  editEventId(event) {
    let newEvents = [...this.state.events];
    let newId = event.target.value.toLowerCase().replace(/\s/g, "-");
    let idCopies = 0;
    newEvents.map(e => {
      if (e.id !== event.target.parentElement.id && e.id === newId) {
        idCopies++;
        newId = idCopies === 1 ? newId + "-" + idCopies : newId.slice(0, newId.length - 1) + idCopies;
      };
      return newId;
    });
    newEvents[newEvents.findIndex(e => e.id === event.target.parentElement.id)].id = newId;
    this.setState({events: newEvents});
  }

  newEvent() {
    let newEvents = [...this.state.events];
    newEvents.splice(newEvents.length - 1, 0, {id: `event-${newEvents.length}`, name: `Event ${newEvents.length}`, notes: ""});
    let newId = newEvents[newEvents.length - 2].id;
    let idCopies = 0;
    newEvents.map(e => {
      if (e.id === newId && e !== newEvents[newEvents.length - 2]) {
        idCopies++;
        newId = idCopies === 1 ? newId + "-" + idCopies : newId.slice(0, newId.length - 1) + idCopies;
      };
      return newId;
    });
    newEvents[newEvents.length - 2].id = newId;
    this.setState({events: newEvents});
    console.log(this.state.events);
  }

  render() {
    return (
      <div id="app">
        <Library library={this.state.library} editLibrary={this.editLibrary} />
        <EventTimeline events={this.state.events} mode={this.state.mode} toggleMode={this.toggleMode} setEventStart={this.setEventStart} eventStart={this.state.eventStart} activeEvent={this.state.activeEvent} setActiveEvent={this.setActiveEvent} triggerEvent={this.triggerEvent} editEventName={this.editEventName} editEventNotes={this.editEventNotes} editEventId={this.editEventId} newEvent={this.newEvent}/>
      </div>
    );
  }
};



export default App;
