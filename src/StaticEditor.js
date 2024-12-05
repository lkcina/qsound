import "./StaticEditor.css";
import "./App.css";
import React from "react";

class StaticEditor extends React.Component {
    constructor(props) {
        super(props);

        this.addStatic = this.addStatic.bind(this);
        this.deleteStatic = this.deleteStatic.bind(this);
        this.editStaticId = this.editStaticId.bind(this);
        this.editStatic = this.editStatic.bind(this);
    }

    addStatic() {
        let newStatics = [...this.props.statics];
        newStatics.splice(newStatics.length, 0, {
            id: "static-" + (newStatics.length + 1),
            name: "Static " + (newStatics.length + 1),
            src: this.props.library[0].src,
            trigger: "",
            from: 0,
            to: this.props.library[0].duration,
            rampIn: 0,
            rampOut: 0,
            gain: 1
        });
        let newId = newStatics[newStatics.length - 1].id;
        let idCopies = 0;
        newStatics.map((s) => {
          if (s.id === newId && s !== newStatics[newStatics.length - 1]) {
            idCopies++;
            newId = idCopies === 1 ? newId + "-" + idCopies : newId.slice(0, newId.length - 1) + idCopies;
          };
          return newId;
        });
        newStatics[newStatics.length - 1].id = newId;
        this.props.editStatics(newStatics);
    }

    deleteStatic(event) {
        let newStatics = [...this.props.statics];
        newStatics.splice(newStatics.findIndex(s => s.id === event.target.parentElement.parentElement.id), 1);
        this.props.editStatics(newStatics);
        console.log("Deleting " + event.target.parentElement.parentElement.id);
        // User deletes a static from the project cue list
    }

    editStaticId(event) {
        let newStatics = [...this.props.statics];
        let newId = event.target.value.toLowerCase().replace(/\s/g, "-");
        let idCopies = 0;
        newStatics.map(s => {
          if (s.id !== event.target.parentElement.parentElement.id && s.id === newId) {
            idCopies++;
            newId = idCopies === 1 ? newId + "-" + idCopies : newId.slice(0, newId.length - 1) + idCopies;
          };
          return newId;
        });
        newStatics[newStatics.findIndex(s => s.id === event.target.parentElement.parentElement.id)].id = newId;
        this.props.editCues(newStatics);
    }

    editStatic(event) {
        let newStatics = [...this.props.statics];
        let targetStatic = event.target;
        while (targetStatic.className !== "static") {
            targetStatic = targetStatic.parentElement;
        }
        newStatics[newStatics.findIndex(s => s.id === targetStatic.id)].name = document.getElementById(targetStatic.id + "-name").value;
        newStatics[newStatics.findIndex(s => s.id === targetStatic.id)].src = document.getElementById(targetStatic.id + "-src").value;
        newStatics[newStatics.findIndex(s => s.id === targetStatic.id)].trigger = document.getElementById(targetStatic.id + "-trigger").value;
        newStatics[newStatics.findIndex(s => s.id === targetStatic.id)].from = document.getElementById(targetStatic.id + "-from").value * 1000;
        newStatics[newStatics.findIndex(s => s.id === targetStatic.id)].to = document.getElementById(targetStatic.id + "-to").value * 1000;
        newStatics[newStatics.findIndex(s => s.id === targetStatic.id)].rampIn = document.getElementById(targetStatic.id + "-ramp-in").value * 1000;
        newStatics[newStatics.findIndex(s => s.id === targetStatic.id)].rampOut = document.getElementById(targetStatic.id + "-ramp-out").value * 1000;
        newStatics[newStatics.findIndex(s => s.id === targetStatic.id)].gain = document.getElementById(targetStatic.id + "-gain-slider").value;
        this.props.editStatics(newStatics);
    }

    render() {
        return (
            <div id="static-editor" className="window">
                <div id="static-container" className="container">
                    {this.props.statics.map(s => {
                        return (
                            <Static key={s.id} id={s.id} name={s.name} src={s.src} trigger={s.trigger} from={s.from} to={s.to} rampIn={s.rampIn} rampOut={s.rampOut} gain={s.gain} deleteStatic={this.deleteStatic} editStatic={this.editStatic} editStaticId={this.editStaticId}  library={this.props.library}/>
                        )
                    })}
                    <button id="add-static-btn" onClick={this.addStatic}>+</button>
                </div>
            </div>
        )
    }
}


const Static = (props) => {
    return (
        <div id={props.id} className="static">
            <div className="static-header">
                <input className="static-name" id={props.id + "-name"} type="text" value={props.name} onChange={props.editStatic} onBlur={props.editStaticId} onKeyDown={(event) => event.key === "Enter" ? props.editStaticId : props.editStatic}  />
                <button className="delete-static-btn" onClick={props.deleteStatic}>X</button>
            </div>
            <div className="static-src">
                <h3>Audio</h3>
                <select id={props.id + "-src"} className="input-selector" value={props.src} onChange={props.editStatic}>
                    {props.library.map(audioFile => {
                        return (
                            <option key={audioFile.id} value={audioFile.src}>{audioFile.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="static-cue">
                <h3>Properties</h3>
                <div className="static-trigger static-properties">
                    <label htmlFor={props.id + "-trigger"}>Trigger:</label>
                    <input id={props.id + "-trigger"} className="input-text" type="text" value={props.trigger} maxLength="1" onChange={props.editStatic} placeholder="Key"/>
                </div>
                <div className="static-from static-properties">
                    <label htmlFor={props.id + "-from"}>From:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-from"} type="number" className="input-number unit" value={props.from / 1000} min="0" max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editStatic}></input><span>s</span>
                    </div>
                </div>
                <div className="static-to static-properties">
                    <label htmlFor={props.id + "-to"}>To:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-to"} type="number" className="input-number unit" value={props.to / 1000} min={props.from / 1000} max={props.library[props.library.findIndex(audioFile => audioFile.src === props.src)].duration / 1000} step="0.01" onChange={props.editStatic}></input><span>s</span>
                    </div>
                </div>
                <div className="static-ramp-in static-properties">
                    <label htmlFor={props.id + "-ramp-in"}>Ramp In:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-ramp-in"} type="number" className="input-number unit" value={props.rampIn / 1000} min="0" max={(props.to - props.from) / 1000} step="0.01" onChange={props.editStatic}></input><span>s</span>
                    </div>
                </div>
                <div className="static-ramp-out static-properties">
                    <label htmlFor={props.id + "-ramp-out"}>Ramp Out:</label>
                    <div className="input-number-container">
                        <input id={props.id + "-ramp-out"} type="number" className="input-number unit" value={props.rampOut / 1000} min="0" max={(props.to - props.from - props.rampIn) / 1000} step="0.01" onChange={props.editStatic}></input><span>s</span>
                    </div>
                </div>
            </div>
            <div className="static-gain">
                <h3>Gain</h3>
                <div className="gain-tools-container">
                    <div className="gain-controls">
                        <input type="number" className="gain-number" id={props.id + "-gain-number"} value={props.gain} min="0" max="1" step="0.01" readOnly></input>
                        <input type="range" className="gain-slider" id={props.id + "-gain-slider"} value={props.gain} min="0" max="1" step="0.01" onChange={props.editStatic}></input>
                    </div>
                </div>
            </div>
        </div>         
    )
};


export default StaticEditor;