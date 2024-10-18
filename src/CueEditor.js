import "./CueEditor.css";
import "./App.css";
import React from "react";

class CueEditor extends React.Component {
    constructor(props) {
      super(props);
      this.addCue = this.addCue.bind(this);
      this.deleteCue = this.deleteCue.bind(this);
      this.editCueId = this.editCueId.bind(this);
      this.editCue = this.editCue.bind(this);
      this.editCueChange = this.editCueChange.bind(this);
      this.addCueChange = this.addCueChange.bind(this);
      this.deleteCueChange = this.deleteCueChange.bind(this);
    }

    addCue() {
        let newCues = [...this.props.cues];
        newCues.splice(newCues.length, 0, {
            id: "cue-" + (newCues.length + 1),
            name: "Cue " + (newCues.length + 1),
            src: this.props.library[0].src,
            start: {
                event: this.props.events[0].id,
                from: 0,
                delay: 0,
                volume: 1,
                ramp: 0,
                loop: false,
                loopStart: 0,
                loopEnd: 0
            },
            changes: [],
            stop: {
                event: this.props.events[0].id,
                delay: 0,
                ramp: 0
            },
            gain: 1
        });
        let newId = newCues[newCues.length - 1].id;
        let idCopies = 0;
        newCues.map(cue => {
          if (cue.id === newId && cue !== newCues[newCues.length - 1]) {
            idCopies++;
            newId = idCopies === 1 ? newId + "-" + idCopies : newId.slice(0, newId.length - 1) + idCopies;
          };
          return newId;
        });
        newCues[newCues.length - 1].id = newId;
        this.props.editCues(newCues);
    }

    deleteCue(event) {
        let newCues = [...this.props.cues];
        newCues.splice(newCues.findIndex(cue => cue.id === event.target.parentElement.parentElement.id), 1);
        this.props.editCues(newCues);
        console.log("Deleting " + event.target.parentElement.parentElement.id);
        // User deletes a cue from the project cue list
    }

    editCueId(event) {
        let newCues = [...this.props.cues];
        let newId = event.target.value.toLowerCase().replace(/\s/g, "-");
        let idCopies = 0;
        newCues.map(e => {
          if (e.id !== event.target.parentElement.parentElement.id && e.id === newId) {
            idCopies++;
            newId = idCopies === 1 ? newId + "-" + idCopies : newId.slice(0, newId.length - 1) + idCopies;
          };
          return newId;
        });
        newCues[newCues.findIndex(cue => cue.id === event.target.parentElement.parentElement.id)].id = newId;
        this.props.editCues(newCues);
    }

    editCue(event) {
        let newCues = [...this.props.cues];
        let targetCue = event.target;
        while (targetCue.className !== "cue") {
            targetCue = targetCue.parentElement;
        }
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].name = document.getElementById(targetCue.id + "-name").value;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].src = document.getElementById(targetCue.id + "-src").value;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].start.event = document.getElementById(targetCue.id + "-start-event").value;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].start.from = document.getElementById(targetCue.id + "-start-from").value * 1000;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].start.delay = document.getElementById(targetCue.id + "-start-delay").value * 1000;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].start.volume = document.getElementById(targetCue.id + "-start-volume").value;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].start.ramp = document.getElementById(targetCue.id + "-start-ramp").value * 1000;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].start.loop = document.getElementById(targetCue.id + "-start-loop").checked;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].start.loopStart = document.getElementById(targetCue.id + "-start-loop-start").value * 1000;        
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].start.loopEnd = document.getElementById(targetCue.id + "-start-loop-end").value * 1000;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].stop.event = document.getElementById(targetCue.id + "-stop-event").value;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].stop.delay = document.getElementById(targetCue.id + "-stop-delay").value * 1000;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].stop.ramp = document.getElementById(targetCue.id + "-stop-ramp").value * 1000;
        newCues[newCues.findIndex(cue => cue.id === targetCue.id)].gain = document.getElementById(targetCue.id + "-gain-slider").value;
        this.props.editCues(newCues);
    }

    addCueChange(event) {
        let newCues = [...this.props.cues];
        let targetCue = newCues.find(cue => cue.id === event.target.parentElement.parentElement.id);
        console.log(targetCue.changes);
        targetCue.changes.splice(targetCue.changes.length, 0, {
            id: targetCue.id + "-change-" + (targetCue.changes.length + 1),
            event: this.props.events[0].id,
            delay: 0,
            volume: 1,
            ramp: 0
        });
        let newId = targetCue.changes[targetCue.changes.length - 1].id;
        let idCopies = 0;
        targetCue.changes.map(change => {
          if (change.id === newId && change !== targetCue.changes[targetCue.changes.length - 1]) {
            idCopies++;
            newId = idCopies === 1 ? newId + "-" + idCopies : newId.slice(0, newId.length - 1) + idCopies;
          };
          return newId;
        });
        targetCue.changes[targetCue.changes.length - 1].id = newId;
        newCues.find(cue => cue.id === targetCue.id).changes = targetCue.changes;
        this.props.editCues(newCues);
    }

    deleteCueChange(event) {
        let newCues = [...this.props.cues];
        let targetChange = event.target;
        while (targetChange.className !== "change") {
            targetChange = targetChange.parentElement;
        }
        let targetCue = targetChange.parentElement.parentElement;
        newCues.find(cue => cue.id === targetCue.id).changes.splice(newCues.find(cue => cue.id === targetCue.id).changes.findIndex(change => change.id === targetChange.id), 1);
        this.props.editCues(newCues);
    }

    editCueChange(event) {
        let newCues = [...this.props.cues];
        let targetChange = event.target;
        while (targetChange.className !== "change") {
            targetChange = targetChange.parentElement;
        }
        let targetCue = targetChange.parentElement.parentElement;
        newCues.find(cue => cue.id === targetCue.id).changes.find(change => change.id === targetChange.id).event = document.getElementById(targetChange.id + "-event").value;
        newCues.find(cue => cue.id === targetCue.id).changes.find(change => change.id === targetChange.id).delay = document.getElementById(targetChange.id + "-delay").value * 1000;
        newCues.find(cue => cue.id === targetCue.id).changes.find(change => change.id === targetChange.id).volume = document.getElementById(targetChange.id + "-volume").value;
        newCues.find(cue => cue.id === targetCue.id).changes.find(change => change.id === targetChange.id).ramp = document.getElementById(targetChange.id + "-ramp").value * 1000;
        this.props.editCues(newCues);
    }

    render() {
        return (
            <div id="cue-editor" className="window">
                <div id="cue-container" className="container">
                    {this.props.cues.map(cue => {
                        return (
                            <Cue key={cue.id} id={cue.id} name={cue.name} src={cue.src} start={cue.start} changes={cue.changes} stop={cue.stop} gain={cue.gain} deleteCue={this.deleteCue} editCue={this.editCue} editCueId={this.editCueId} addCueChange={this.addCueChange} deleteCueChange={this.deleteCueChange} editCueChange={this.editCueChange} library={this.props.library} events={this.props.events}/>
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
            <div className="cue-header">
                <input className="cue-name" id={props.id + "-name"} type="text" value={props.name} onChange={props.editCue} onBlur={props.editCueId} onKeyDown={(event) => event.keyCode === 13 ? props.editCueId : props.editCue}  />
                <button className="delete-cue-btn" onClick={props.deleteCue}>X</button>
            </div>
            <div className="cue-src">
                <h3>Audio</h3>
                <select id={props.id + "-src"} className="input-selector" value={props.src} onChange={props.editCue}>
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
                    <label htmlFor={props.id + "-start-event"}>Event:</label>
                    <select id={props.id + "-start-event"} className="input-selector" value={props.start.event} onChange={props.editCue}>
                        {props.events.map(event => {
                            return (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="cue-start-from cue-properties">
                    <label htmlFor={props.id + "-start-from"}>From:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-from"} type="number" className="input-number unit" value={props.start.from / 1000} min="0" max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className="cue-start-delay cue-properties">
                    <label htmlFor={props.id + "-start-delay"}>Delay:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-delay"} type="number" className="input-number unit" value={props.start.delay / 1000} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className="cue-start-volume cue-properties">
                    <label htmlFor={props.id + "-start-volume"}>Volume:</label>
                    <input id={props.id + "-start-volume"} type="number" className="input-number" value={props.start.volume} min="0" max="2" step="0.01" onChange={props.editCue}></input>
                </div>
                <div className="cue-start-ramp cue-properties">
                    <label htmlFor={props.id + "-start-ramp"}>Ramp:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-ramp"} type="number" className="input-number unit" value={props.start.ramp / 1000} min="0" max={(props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration - props.start.from) / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className="cue-start-loop cue-properties">
                    <label htmlFor={props.id + "-start-loop"}>Loop:</label>
                    <input id={props.id + "-start-loop"} type="checkbox" className="input-checkbox" checked={props.start.loop} onChange={props.editCue}></input>
                </div>
                <div className={props.start.loop ? "cue-start-loop-end cue-properties" : "cue-start-loop-end cue-properties loop-property"}>
                    <label htmlFor={props.id + "-start-loop-start"}>Loop Start:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-loop-start"} type="number" className="input-number unit" value={props.start.loopStart / 1000} min="0" max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className={props.start.loop ? "cue-start-loop-end cue-properties" : "cue-start-loop-end cue-properties loop-property"}>
                    <label htmlFor={props.id + "-start-loop-end"}>Loop End:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-start-loop-end"} type="number" className="input-number unit" value={props.start.loopEnd / 1000} min={props.start.loopStart / 1000} max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
            </div>
            <div className="cue-changes">
                <h3>Changes</h3>
                {props.changes.map(change => {
                    return (
                        <Change key={change.id} id={change.id} cueId={props.id} event={change.event} delay={change.delay} volume={change.volume} ramp={change.ramp} editCueChange={props.editCueChange} deleteCueChange={props.deleteCueChange} events={props.events}/>
                    )
                })}
                
                <button className="add-change-btn" onClick={props.addCueChange}>+ Change</button>
            </div>
            <div className="cue-stop">
                <h3>Stop</h3>
                <div className="cue-stop-event cue-properties">
                    <label htmlFor={props.id + "-stop-event"}>Event:</label>
                    <select id={props.id + "-stop-event"} className="input-selector" value={props.stop.event} onChange={props.editCue}>
                        {props.events.map(event => {
                            return (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="cue-stop-delay cue-properties">
                    <label htmlFor={props.id + "-stop-delay"}>Delay:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-stop-delay"} type="number" className="input-number unit" value={props.stop.delay / 1000} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
                <div className="cue-stop-ramp cue-properties">
                    <label htmlFor={props.id + "-stop-ramp"}>Ramp:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-stop-ramp"} type="number" className="input-number unit" value={props.stop.ramp / 1000} min="0" step="0.01" onChange={props.editCue}></input><span>s</span>
                    </div>
                </div>
            </div>
            <div className="cue-gain">
                <h3>Gain</h3>
                <div className="gain-tools-container">
                    <div className="gain-controls">
                        <input type="number" className="gain-number" id={props.id + "-gain-number"} value={props.gain} min="0" max="2" step="0.01" readOnly></input>
                        <input type="range" className="gain-slider" id={props.id + "-gain-slider"} value={props.gain} min="0" max="2" step="0.01" onChange={props.editCue}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Change = (props) => {
    return (
        <div id={props.id} className="change">
            <button className="delete-change-btn" onClick={props.deleteCueChange}>X</button>
            <div className="change-event cue-properties">
                <label htmlFor={props.id + "-event"}>Event:</label>
                <select id={props.id + "-event"} className="input-selector" value={props.event} onChange={props.editCueChange}>
                    {props.events.map(event => {
                        return (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="change-delay cue-properties">
                <label htmlFor={props.id + "-delay"}>Delay:</label>
                <div className="input-number-container">
                    <input id={props.id + "-delay"} type="number" className="input-number unit" value={props.delay / 1000} min="0" step="0.01" onChange={props.editCueChange}></input><span>s</span>
                </div>
            </div>
            <div className="change-volume cue-properties">
                <label htmlFor={props.id + "-volume"}>Volume:</label>
                <input id={props.id + "-volume"} type="number" className="input-number" value={props.volume} min="0" max="2" step="0.01" onChange={props.editCueChange}></input>
            </div>
            <div className="change-ramp cue-properties">
                <label htmlFor={props.id + "-ramp"}>Ramp:</label>
                <div className="input-number-container">
                    <input id={props.id + "-ramp"} type="number" className="input-number unit" value={props.ramp / 1000} min="0" step="0.01" onChange={props.editCueChange}></input><span>s</span>
                </div>
            </div>
        </div>
    )
}

export default CueEditor;