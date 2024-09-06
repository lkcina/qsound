import "./EventTimeline.css";
import "./App.css";
import React from "react";

class EventTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.previousEvent = this.previousEvent.bind(this);
        this.nextEvent = this.nextEvent.bind(this);
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

    render() {
        return (
            <div id="event-timeline" className="window">
                <div className="toolbar">
                    <div id="mode-controls">
                        <button id="mode-toggle" onClick={this.props.toggleMode}>{this.props.mode === "create" ? "Present" : "Create"}</button>
                        <select id="event-start" onChange={this.props.setEventStart} value={this.props.eventStart.id}>
                            {this.props.events.map(event => {
                                return <option key={event.id} value={event.id}>{event.name}</option>
                            })}
                        </select>
                    </div>
                    <div id="trigger-controls">
                        <button id="trigger-event" onClick={this.props.triggerEvent}>Trigger Event</button>
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
                    <div id="timer"></div>
                </div>
                <div id="event-list" className="container">
                    <div id="start" name="Start"></div>
                    <div id="event-line"></div>
                    {this.props.events.map(event => {
                        if (event.id === "end") {
                            return (
                            <div key={event.id} id={event.id} name={event.name}>
                                <div id="new-event" onClick={this.props.newEvent}>+</div>
                                <div id={event.id} name={event.name}></div>
                            </div>
                        );
                        } else {
                            return <EventComponent key={event.id} id={event.id} name={event.name} notes={event.notes} editEventName={this.props.editEventName} editEventNotes={this.props.editEventNotes} editEventId={this.props.editEventId} />
                        }
                    })}
                </div>
            </div>
        );
    };
};

const EventComponent = (props) => {
    return (
        <div className="event" id={props.id}>
            <input className="event-name" type="text" value={props.name} onChange={props.editEventName} onBlur={props.editEventId} onKeyDown={(event) => event.keyCode === 13 ? props.editEventId : props.editEventName} />
            <textarea className="event-notes" value={props.notes} onChange={props.editEventNotes} />
        </div>
    );
};

export default EventTimeline;