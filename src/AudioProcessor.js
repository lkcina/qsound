import React from 'react';


const audioContext = new AudioContext();
const masterGain = audioContext.createGain();
const output = audioContext.destination;
masterGain.connect(output);

masterGain.gain.value = 0.2;

class AudioProcessor extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        
        if (this.props.mode === "present") {
            audioContext.resume();
            this.props.cues.forEach(cue => {
                const audioElement = document.getElementById(cue.id + "-audio");
                const source = audioContext.createMediaElementSource(audioElement);
                const gainNode = audioContext.createGain();
                source.connect(gainNode);
                gainNode.connect(masterGain);
                console.log(audioElement, gainNode, source);
            });
            console.log(document.getElementById("cue-1-audio"));
        }

        return (
            <div>
                <h1>Audio Processor</h1>
                {this.props.cues.map(cue => {
                    
                    
                    return (
                        <div key={cue.id}>
                            <audio id={cue.id + "-audio"} src={cue.src}></audio>
                            <button id={cue.id + "-button"} onClick={() => document.getElementById(cue.id + "-audio").play()}>{cue.name}</button>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default AudioProcessor;