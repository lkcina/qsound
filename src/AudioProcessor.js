import React from 'react';



class AudioProcessor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const audioContext = new AudioContext();
        this.cues.forEach(cue => {
            // Create audio node with gain node and route to destination
            const buffer = audioContext.createBuffer();
            const source = audioContext.createBufferSource();
            const gainNode = audioContext.createGain();
        });

        return (
            <div>
                <h1>Audio Processor</h1>
            </div>
        );
    }
}

export default AudioProcessor;