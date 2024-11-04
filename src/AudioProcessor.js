import React from 'react';


const audioContext = new AudioContext();
const masterGain = audioContext.createGain();
const output = audioContext.destination;
masterGain.connect(output);

class AudioProcessor extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        
        if (this.props.mode === "present") {
            audioContext.resume();
            this.props.cues.forEach(cue => {
                const audioElement = document.createElement("audio");
                audioElement.src = cue.src;
                audioElement.id = cue.id + "-audio";
                audioElement.preload = "auto";
                document.getElementById("audio-processor").appendChild(audioElement);
                
                const source = audioContext.createMediaElementSource(audioElement);
                const gainNode = audioContext.createGain();
                source.connect(gainNode);
                gainNode.connect(masterGain);
                

                console.log(audioElement, source, gainNode);

                if (this.props.events.findIndex(event => event.id === this.props.activeEvent.id) - 1 !== -1 && this.props.events[this.props.events.findIndex(event => event.id === this.props.activeEvent.id) - 1].id === cue.start.event) {
                    console.log("play " + cue.id);
                    setTimeout(() => {
                        audioElement.currentTime = cue.start.from / 1000;
                        audioElement.play();

                    }, cue.start.delay)
                    console.log(audioElement);
                }
                
                
            })
        } else {
    // Audio Elements must stop and be removed from the audio context (deleted)
            this.props.cues.forEach(cue => {
                console.log(document.getElementById(cue.id + "-audio"));
                if (document.getElementById(cue.id + "-audio")) {
                    const audioElement = document.getElementById(cue.id + "-audio");
                    audioElement.pause();
                    audioElement.remove();

                    console.log(audioElement);
                }
            });
            audioContext.suspend();
        }

        
        


        return (
            <div id="audio-processor">
                <h1>Audio Processor</h1>
            </div>
        );
    }
}

export default AudioProcessor;