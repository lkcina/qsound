import "./CueEditor.css";
import "./App.css";
import React from "react";

class CueEditor extends React.Component {
    constructor(props) {
      super(props);
      this.addCue = this.addCue.bind(this);
      this.delCue = this.delCue.bind(this);
      this.editCue = this.editCue.bind(this);
    }

    render() {
        return (
            <div id="cue-editor" className="window">
                <div id="cue-container" className="container">
                    {this.props.cues.map(cue => {
                        return (
                            <Cue key={cue.id} id={cue.id} src={cue.src} start={cue.start} changes={cue.changes} stop={cue.stop} gain={cue.gain} deleteCue={this.deleteCue} editCue={this.editCue}/>
                        )
                    })}
                    <button id="add-cue-btn" onClick={this.addCue}>+</button>
                </div>
            </div>
        )
    }
}

export default CueEditor;