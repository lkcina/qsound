import "./EventTimeline.css";
import "./App.css";
import React from "react";

class EventTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.previousEvent = this.previousEvent.bind(this);
        this.nextEvent = this.nextEvent.bind(this);
        this.startTimer = this.startTimer.bind(this);
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
            document.getElementById(this.props.activeEvent.id).querySelector(".time-stamp").textContent = document.getElementById("timer").textContent;
        } else if (this.props.activeEvent.id === "end") {
            document.getElementById("timer").textContent = "00:00:00.00";
            document.querySelectorAll(".time-stamp").forEach(timeStamp => {
                timeStamp.textContent = "";
            });
        } else {
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
                            <button class="previous-event" onClick={this.previousEvent}>&lt;</button>
                            <select id="active-event" onChange={this.props.setActiveEvent} value={this.props.activeEvent.id}>
                                {this.props.events.map(event => {
                                    return <option key={event.id} value={event.id}>{event.name}</option>
                                })};
                            </select>
                            <button class="next-event" onClick={this.nextEvent}>&gt;</button>
                        </div>
                    </div>
                    <div id="timer">00:00:00.00</div>
                </div>
                <div id="event-list-container" className="container">
                    <div id="event-list">
                        <div id="start" name="Start">Start</div>
                        <div className="event-line"></div>
                        {this.props.events.map(event => {
                            if (event.id === "end") {
                                return (
                                <div key={event.id} id="end-timeline" name={event.name}>
                                    <div id="new-event" onClick={this.props.newEvent} style={this.props.mode === "present" ? {display: "none"} : {display: "block"}}>+</div>
                                    <div className="event-line" style={this.props.mode === "present" ? {display: "none"} : {display: "block"}}></div>
                                    <div id={event.id} name={event.name} className={this.props.activeEvent.id === event.id ? "active" : ""}>End</div>
                                </div>
                            );
                            } else {
                                return <EventComponent key={event.id} id={event.id} name={event.name} notes={event.notes} activeEvent={this.props.activeEvent} editEventName={this.props.editEventName} editEventNotes={this.props.editEventNotes} editEventId={this.props.editEventId} />
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
                <input className="event-name" type="text" value={props.name} onChange={props.editEventName} onBlur={props.editEventId} onKeyDown={(event) => event.keyCode === 13 ? props.editEventId : props.editEventName} />
                <textarea className="event-notes" value={props.notes} onChange={props.editEventNotes} placeholder="Notes"/>
            </div>
            <div className="event-line"></div>
        </div>
    );
};

export default EventTimeline;