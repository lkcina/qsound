import "./EventTimeline.css";
import "./App.css";
import React from "react";

class EventTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.previousEvent = this.previousEvent.bind(this);
        this.nextEvent = this.nextEvent.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.editEventName = this.editEventName.bind(this);
        this.editEventNotes = this.editEventNotes.bind(this);
        this.editEventId = this.editEventId.bind(this);
        this.newEvent = this.newEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    previousEvent(event) {
        if (document.getElementById("active-event").selectedIndex === 0) {
            document.getElementById("active-event").selectedIndex = document.getElementById("active-event").options.length - 1;
        } else {
            document.getElementById("active-event").selectedIndex = document.getElementById("active-event").selectedIndex - 1;
        };
        const change = new Event('change', { bubbles: true });
        document.getElementById("active-event").dispatchEvent(change);
    }

    nextEvent(event) {
        if (document.getElementById("active-event").selectedIndex === document.getElementById("active-event").options.length - 1) {
            document.getElementById("active-event").selectedIndex = 0;
        } else {
            document.getElementById("active-event").selectedIndex = document.getElementById("active-event").selectedIndex + 1;
        };
        const change = new Event('change', { bubbles: true });
        document.getElementById("active-event").dispatchEvent(change);
    }

    editEventName(event) {
        let newEvents = [...this.props.events];
        newEvents[newEvents.findIndex(e => e.id === event.target.parentElement.id)].name = event.target.value;
        this.props.editEvents(newEvents);
    }

    editEventNotes(event) {
        let newEvents = [...this.props.events];
        newEvents[newEvents.findIndex(e => e.id === event.target.parentElement.id)].notes = event.target.value;
        this.props.editEvents(newEvents);
    }

    editEventId(event) {
        let newEvents = [...this.props.events];
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
        this.props.editEvents(newEvents);
    }

    newEvent() {
        let newEvents = [...this.props.events];
        newEvents.splice(newEvents.length - 1, 0, {id: `event-${newEvents.length}`, name: `Event ${newEvents.length - 1}`, notes: ""});
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
        this.props.editEvents(newEvents);
    }
    
    deleteEvent() {
        let newEvents = [...this.props.events];
        const newActiveEvent = newEvents[newEvents.findIndex(e => e.id === this.props.activeEvent.id) + 1];
        console.log(newActiveEvent);
        newEvents.splice(newEvents.findIndex(e => e.id === this.props.activeEvent.id), 1);
        this.props.editEvents(newEvents);
        this.props.setActiveEvent({target: {value: newActiveEvent.id}});
    }

    startTimer() {
        if (this.props.eventStart === this.props.activeEvent && this.props.activeEvent.id !== "end") {
            let time = 0;
            const interval = setInterval(() => {
                time += 10;
                const hours = Math.floor(time / 3600000);
                const minutes = Math.floor(time / 60000) % 60;
                const seconds = Math.floor(time / 1000) % 60;
                const centiseconds = Math.floor(time / 10) % 100;
                if (this.props.mode === "create") {
                    document.getElementById("timer").textContent = "00:00:00.00";
                    document.querySelectorAll(".time-stamp").forEach(timeStamp => {
                        timeStamp.textContent = "";
                    });
                    time = 0;
                    clearInterval(interval);
                    return;
                } else {
                    document.getElementById("timer").textContent = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + "." + (centiseconds < 10 ? "0" + centiseconds : centiseconds);
                }
                
            }, 10);
            if (this.props.activeEvent.id !== "start") {
                document.getElementById(this.props.activeEvent.id).querySelector(".time-stamp").textContent = document.getElementById("timer").textContent;
            } else {
                return;
            }
        } else if (this.props.activeEvent.id === "end") {
            document.getElementById("timer").textContent = "00:00:00.00";
            document.querySelectorAll(".time-stamp").forEach(timeStamp => {
                timeStamp.textContent = "";
            });
        } else if (this.props.activeEvent.id !== "start") {
            document.getElementById(this.props.activeEvent.id).querySelector(".time-stamp").textContent = document.getElementById("timer").textContent;
        };
    }

    render() {
        return (
            <div id="event-timeline" className="window">
                <div className="toolbar">
                    <div id="mode-controls">
                        <button id="mode-toggle" className={this.props.mode === "present" ? "present" : ""} onClick={this.props.toggleMode}>P</button>
                        <select id="event-start" onChange={this.props.setEventStart} value={this.props.eventStart.id}>
                            {this.props.events.map(event => {
                                return <option key={event.id} value={event.id}>{event.name}</option>
                            })}
                        </select>
                    </div>
                    <div id="trigger-controls">
                        <button id="trigger-event" onClick={() => {
                            this.props.triggerEvent();
                            this.startTimer();
                        }} style={{ visibility: this.props.mode === "create" ? "hidden" : "visible" }}>Tr</button>
                        <div id="active-event-controls">
                            <button className="previous-event" onClick={this.previousEvent}>&lt;</button>
                            <select id="active-event" onChange={this.props.setActiveEvent} value={this.props.activeEvent.id}>
                                {this.props.events.map(event => {
                                    return <option key={event.id} value={event.id}>{event.name}</option>
                                })};
                            </select>
                            <button className="next-event" onClick={this.nextEvent}>&gt;</button>
                        </div>
                    </div>
                    <div id="timer">00:00:00.00</div>
                </div>
                <div id="event-list-container" className="container">
                    <div id="event-list">                        
                        {this.props.events.map(event => {
                            if (event.id === "end") {
                                return (
                                    <div key={event.id} id="end-timeline" name={event.name}>
                                        <div id="new-event" onClick={this.newEvent} style={this.props.mode === "present" ? {display: "none"} : {display: "block"}}>+</div>
                                        <div className="event-line" style={this.props.mode === "present" ? {display: "none"} : {display: "block"}}></div>
                                        <div id={event.id} name={event.name} className={this.props.activeEvent.id === event.id ? "active" : ""}>End</div>
                                    </div>
                                );
                            } else if (event.id === "start") {
                                return (
                                    <div key={event.id} id={"start-timeline"} name={event.name}>
                                        <div id={event.id} name={event.name} className={this.props.activeEvent.id === event.id ? "active" : ""}>Start</div>
                                        <div className="event-line"></div>
                                    </div>
                                );
                            } else {
                                return <EventComponent key={event.id} id={event.id} name={event.name} notes={event.notes} activeEvent={this.props.activeEvent} editEventName={this.editEventName} editEventNotes={this.editEventNotes} editEventId={this.editEventId} deleteEvent={this.deleteEvent}/>
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    };
};

const EventComponent = (props) => {
    return (
        <div className="event-container">
            
            <div className={props.activeEvent.id === props.id ? "event active" : "event"} id={props.id}>
                <div className="time-stamp"></div>
                <button className="event-del-btn" onClick={props.deleteEvent}>X</button>
                <input className="event-name" type="text" value={props.name} onChange={props.editEventName} onBlur={props.editEventId} onKeyDown={(event) => event.keyCode === 13 ? props.editEventId : props.editEventName} />
                <textarea className="event-notes" value={props.notes} onChange={props.editEventNotes} placeholder="Notes"/>
            </div>
            <div className="event-line"></div>
        </div>
    );
};

export default EventTimeline;