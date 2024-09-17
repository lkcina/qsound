import "./CueEditor.css";
import "./App.css";
import React from "react";

class CueEditor extends React.Component {
    constructor(props) {
      super(props);
      this.addCue = this.addCue.bind(this);
      this.deleteCue = this.deleteCue.bind(this);
      this.editCue = this.editCue.bind(this);
    }

    addCue() {
        console.log("Adding cue");
        // User adds a cue to the project cue list
    }

    deleteCue(event) {
        console.log("Deleting " + event.target.parentElement.id);
        // User deletes a cue from the project cue list
    }

    editCue(event) {
        console.log("Editing " + event.target.parentElement.id);
    }

    render() {
        return (
            <div id="cue-editor" className="window">
                <div id="cue-container" className="container">
                    {this.props.cues.map(cue => {
                        return (
                            <Cue key={cue.id} id={cue.id} src={cue.src} start={cue.start} changes={cue.changes} stop={cue.stop} gain={cue.gain} deleteCue={this.deleteCue} editCue={this.editCue} library={this.props.library} events={this.props.events}/>
                        )
                    })}
                    <button id="add-cue-btn" onClick={this.addCue}>+</button>
                </div>
            </div>
        )
    }
}

const Cue = (props) => {
    return (
        <div id={props.id} className="cue">
            <button className="delete-cue-btn" onClick={props.deleteCue}>X</button>
            <div className="cue-src">
                <h3>Audio</h3>
                <select id={props.id + "-audio"} className="input-selector" value={props.src} onChange={props.editCue}>
                    {props.library.map(audioFile => {
                        return (
                            <option key={audioFile.id} value={audioFile.src}>{audioFile.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="cue-start">
                <h3>Start</h3>
                <div className="cue-start-event cue-properties">
                    <label for={props.id + "-start-event"}>Event:</label>
                    <select id={props.id + "-start-event"} className="input-selector" value={props.start.event} onChange={props.editCue}>
                        {props.events.map(event => {
                            return (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="cue-start-from cue-properties">
                    <label for={props.id + "-start-from"}>From:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-from"} type="number" className="input-number unit" value={props.start.from} min="0" max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className="cue-start-delay cue-properties">
                    <label for={props.id + "-start-delay"}>Delay:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-delay"} type="number" className="input-number unit" value={props.start.delay} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className="cue-start-volume cue-properties">
                    <label for={props.id + "-start-volume"}>Volume:</label>
                    <input id={props.id + "-start-delay"} type="number" className="input-number" value={props.start.volume} min="0" max="2" step="0.01" onChange={props.editCue}></input>
                </div>
                <div className="cue-start-ramp cue-properties">
                    <label for={props.id + "-start-ramp"}>Ramp:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-ramp"} type="number" className="input-number unit" value={props.start.ramp} min="0" max={(props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration - props.start.from) / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className="cue-start-loop cue-properties">
                    <label for={props.id + "-start-loop"}>Loop:</label>
                    <input id={props.id + "-start-loop"} type="checkbox" className="input-checkbox" checked={props.start.loop} onChange={props.editCue}></input>
                </div>
                <div className={props.start.loop ? "cue-start-loop-end cue-properties" : "cue-start-loop-end cue-properties loop-property"}>
                    <label for={props.id + "-start-loop-start"}>Loop Start:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-loop-start"} type="number" className="input-number unit" value={props.start.loopStart} min="0" max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className={props.start.loop ? "cue-start-loop-end cue-properties" : "cue-start-loop-end cue-properties loop-property"}>
                    <label for={props.id + "-start-loop-end"}>Loop End:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-loop-end"} type="number" className="input-number unit" value={props.start.loopEnd} min={props.start.loopStart} max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
            </div>
            <div className="cue-changes">
                <h3>Changes</h3>
                {props.changes.map(change => {
                    return (
                        <Change key={change.id} id={change.id} event={change.event} delay={change.delay} volume={change.volume} ramp={change.ramp} editCue={props.editCue} events={props.events}/>
                    )
                })}
                <button className="add-change-btn" onClick={props.editCue}>+ Change</button>
            </div>
            <div className="cue-stop">
                <h3>Stop</h3>
                <div className="cue-stop-event cue-properties">
                    <label for={props.id + "-stop-event"}>Event:</label>
                    <select id={props.id + "-stop-event"} className="input-selector" value={props.stop.event} onChange={props.editCue}>
                        {props.events.map(event => {
                            return (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="cue-stop-delay cue-properties">
                    <label for={props.id + "-stop-delay"}>Delay:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-stop-delay"} type="number" className="input-number unit" value={props.stop.delay} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className="cue-stop-ramp cue-properties">
                    <label for={props.id + "-stop-ramp"}>Ramp:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-stop-ramp"} type="number" className="input-number unit" value={props.stop.ramp} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
            </div>
            <div className="cue-gain">
                <h3>Gain</h3>
                <input type="range" className="gain-slider" value={props.gain} min="0" max="2" step="0.01" onChange={props.editCue}></input>
            </div>
        </div>
    )
}

const Change = (props) => {
    return (
        <div id={props.id} className="change">
            <button className="delete-change-btn" onClick={props.editCue}>X</button>
            <div className="change-event cue-properties">
                <label for={props.id + "-event"}>Event:</label>
                <select id={props.id + "-event"} className="input-selector" value={props.event} onChange={props.editCue}>
                    {props.events.map(event => {
                        return (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="change-delay cue-properties">
                <label for={props.id + "-delay"}>Delay:</label>
                <div className="input-number-container">
                    <input id={props.id + "-delay"} type="number" className="input-number unit" value={props.delay} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
            </div>
            <div className="change-volume cue-properties">
                <label for={props.id + "-volume"}>Volume:</label>
                <div className="input-number-container">
                    <input id={props.id + "-volume"} type="number" className="input-number" value={props.volume} min="0" max="2" step="0.01" onChange={props.editCue}></input>
                </div>
            </div>
            <div className="change-ramp cue-properties">
                <label for={props.id + "-ramp"}>Ramp:</label>
                <div className="input-number-container">
                    <input id={props.id + "-ramp"} type="number" className="input-number unit" value={props.ramp} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
            </div>
        </div>
    )
}

export default CueEditor;