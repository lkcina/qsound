import "./EventTimeline.css";
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
            <div id="event-timeline">
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
                </div>
            </div>
        );
    }
}

export default EventTimeline;