import "./AudioProcessor.css";
import "./App.css";
import React from 'react';


const audioContext = new AudioContext();
const masterGain = audioContext.createGain();
const masterAnalyser = audioContext.createAnalyser();
const analyserArray = new Uint8Array();
const output = audioContext.destination;
masterGain.connect(masterAnalyser);
masterGain.connect(output);
masterAnalyser.getByteFrequencyData(analyserArray);

class AudioProcessor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {masterGainValue: 1}
        this.changeMasterGain = this.changeMasterGain.bind(this);
    }

    changeMasterGain(event) {
        this.setState({masterGainValue: event.target.value});
    }

    render() {
        
        masterGain.gain.value = this.state.masterGainValue;

        if (this.props.mode === "present") {
            audioContext.resume();
            this.props.cues.forEach(cue => {
                if (!document.getElementById(cue.id + "-audio")) {
                    const audioElement = document.createElement("audio");
                    audioElement.id = cue.id + "-audio";
                    audioElement.src = cue.src;
                    document.body.appendChild(audioElement);
                    const source = audioContext.createMediaElementSource(audioElement);
                    source.connect(masterGain);
                };
            })
        } else {
            [...document.querySelectorAll("body > audio")].forEach(audio => {
                audio.pause();
                audio.remove();
            });
            
            audioContext.suspend();
        }

        if (this.props.mode === "present") {
            this.props.cues.forEach(cue => {
                const audioElement = document.getElementById(cue.id + "-audio");
                if (audioElement !== null) {
                    console.log(cue.gain);
                    audioElement.volume = cue.gain;
                }
                const triggeredEvent = this.props.events[this.props.events.findIndex(event => event.id === this.props.activeEvent.id) - 1];

                if (triggeredEvent && triggeredEvent.id === cue.stop.event) {
                    setTimeout(() => {
                        if (!this.props.gainRamps.some(ramp => ramp.cueId === cue.id && ramp.cueIndex === cue.changes.length + 1)) {
                            console.log("stop " + cue.id);
                            this.props.changeCueGain(cue, triggeredEvent, cue.changes.length + 1, audioElement.volume, 0, cue.stop.ramp);
                        }
                    }, cue.stop.delay);

                    
                }
                
                if (triggeredEvent && triggeredEvent.id === cue.start.event) {
                    
                    setTimeout(() => {
                        if (!this.props.gainRamps.some(ramp => ramp.cueId === cue.id && ramp.cueIndex === 0)) {
                            console.log("start " + cue.id);
                            audioElement.currentTime = cue.start.from / 1000;
                            audioElement.play();
                            if (cue.start.loop) {
                                let playTime = audioElement.currentTime;
                                audioElement.addEventListener("timeupdate", (event) => {
                                    playTime = audioElement.currentTime;
                                    console.log(playTime);
                                })
                                const playTimer = setInterval(() => {
                                    if (audioElement.paused) {
                                        console.log("End Loop")
                                        clearInterval(playTimer);
                                    } else if (playTime >= cue.start.loopEnd / 1000) {
                                        playTime = cue.start.loopStart / 1000;
                                        audioElement.currentTime = cue.start.loopStart / 1000;
                                        console.log("Looping", playTime, audioElement.currentTime);
                                    } else {
                                        playTime += 0.01;
                                        console.log(playTime);
                                    }
                                }, 10)
                            }
                            
                            this.props.changeCueGain(cue, triggeredEvent, 0, 0, cue.start.volume, cue.start.ramp);
                        }
                    }, cue.start.delay);

                }
                
                cue.changes.forEach(change => {
                    if (triggeredEvent && triggeredEvent.id === change.event) {
                        setTimeout(() => {
                            if (!this.props.gainRamps.some(ramp => ramp.cueId === cue.id && ramp.cueIndex === cue.changes.findIndex(c => c.id === change.id) + 1)) {
                                console.log(change.id);
                                this.props.changeCueGain(cue, triggeredEvent, cue.changes.findIndex(c => c.id === change.id) + 1, audioElement.volume, change.volume, change.ramp);
                            }
                        }, change.delay);
                            
                    };
                })
            })
        }
        
        
        return (
            <div id="audio-processor" className="window">
                <div id="master-gain">
                    <h3 className="gain-label">Gain</h3>
                    <div className="gain-tools-container">
                        <div className="gain-controls">
                            <input type="number" className="gain-number" id={"master-gain-number"} value={masterGain.gain.value} min="0" max="1" step="0.01" readOnly></input>
                            <input type="range" className="gain-slider" id={"master-gain-slider"} value={masterGain.gain.value} min="0" max="1" step="0.01" onChange={this.changeMasterGain}></input>
                        </div>
                    </div>
                </div>
                <h2>Stereo Out</h2>
            </div>
        );
    }
}

export default AudioProcessor;