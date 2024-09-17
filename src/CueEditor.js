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
            <select className="cue-src" value={props.src} onChange={props.editCue}>
                {props.library.map(audioFile => {
                    return (
                        <option key={audioFile.id} value={audioFile.src}>{audioFile.name}</option>
                    )
                })}
            </select>
            <div className="cue-start">
                <p>Start</p>
                <div className="cue-start-event">
                    <select className="input-selector" value={props.start.event} onChange={props.editCue}>
                        {props.events.map(event => {
                            return (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="cue-start-location">
                    <input type="number" className="input-number" value={props.start.location} min="0" max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
                <div className="cue-start-delay">
                    <input type="number" className="input-number" value={props.start.delay} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
                <div className="cue-start-volume">
                    <input type="number" className="input-number" value={props.start.volume} min="0" max="2" step="0.01" onChange={props.editCue}></input>
                </div>
                <div className="cue-start-ramp">
                    <input type="number" className="input-number" value={props.start.ramp} min="0" max={(props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration - props.start.location) / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
                <div className="cue-start-loop">
                    <input type="checkbox" className="input-checkbox" checked={props.start.loop} onChange={props.editCue}></input><span>Loop</span>
                </div>
                <div className="cue-start-loop-start">
                    <input type="number" className="input-number" value={props.start.loopStart} min="0" max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
                <div className="cue-start-loop-end">
                    <input type="number" className="input-number" value={props.start.loopEnd} min={props.start.loopStart} max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
            </div>
            <div className="cue-changes">
                <p>Changes</p>
                {props.changes.map(change => {
                    return (
                        <Change key={change.id} id={change.id} event={change.event} delay={change.delay} volume={change.volume} ramp={change.ramp} editCue={props.editCue} events={props.events}/>
                    )
                })}
                <button className="add-change-btn" onClick={props.editCue}>+ Change</button>
            </div>
            <div className="cue-stop">
                <p>Stop</p>
                <div className="cue-stop-event">
                    <select className="input-selector" value={props.stop.event} onChange={props.editCue}>
                        {props.events.map(event => {
                            return (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="cue-stop-delay">
                    <input type="number" className="input-number" value={props.stop.delay} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
                <div className="cue-stop-ramp">
                    <input type="number" className="input-number" value={props.stop.ramp} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                </div>
            </div>
            <div className="cue-gain">
                <input type="range" className="gain-slider" value={props.gain} min="0" max="2" step="0.01" onChange={props.editCue}></input>
            </div>
        </div>
    )
}

export default CueEditor;