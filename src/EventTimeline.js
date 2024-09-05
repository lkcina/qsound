import "./EventTimeline.css";
import React from "react";

class EventTimeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="event-timeline">
                <div className="toolbar">
                    <button id="mode-toggle" onClick={this.props.toggleMode}>Present</button>
                </div>
            </div>
        );
    }
}

export default EventTimeline;