import React from 'react';


const audioContext = new AudioContext();
const masterGain = audioContext.createGain();
const output = audioContext.destination;
masterGain.connect(output);
masterGain.gain.value = 1;

class AudioProcessor extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        
        

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
            console.log(document.querySelectorAll("body > audio"));
            [...document.querySelectorAll("body > audio")].forEach(audio => {
                audio.pause();
                audio.remove();
            });
            console.log(document.querySelectorAll("body > audio"));
            
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
            <div id="audio-processor">
                <h1>Audio Processor</h1>
            </div>
        );
    }
}

export default AudioProcessor;