import "./App.css";
import "./Library.css";
import React from "react";

class Library extends React.Component {
    constructor(props) {
      super(props);
      this.addAudioFile = this.addAudioFile.bind(this);
      this.playAudioFile = this.playAudioFile.bind(this);
      this.delAudioFile = this.delAudioFile.bind(this);
    }
  
    addAudioFile() {
      console.log("Adding audio file");
      // User selects file from file dialog, which is uploaded to project audio library and added to the library state
      
    }
  
    delAudioFile(event) {
      console.log("Deleting audio file");
      // User deletes audio file from library, which is removed from the project audio library and the library state
      this.props.editLibrary(this.props.library.filter(audioFile => audioFile.id !== event.target.parentElement.querySelector("audio").id));
    }
  
    playAudioFile(event) {
      document.querySelectorAll("audio").forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      if (event.target.classList.contains("library-playing")) {
        event.target.classList.remove("library-playing");
      } else {
        document.querySelectorAll(".library-playing").forEach(btn => {
          btn.classList.remove("library-playing");
        })
        event.target.classList.add("library-playing");
        event.target.parentElement.querySelector("audio").play();
      };
    }
  
    render() {
      return (
        <div id="library" className="window">
          <h2>Library</h2>
          <div className="toolbar">
            <button className="add-audio-btn" onClick={this.addAudioFile}>+</button>
          </div>
          <div className="audio-file-container">
            {this.props.library.map(audioFile => (
  
              <AudioFile key={audioFile.id} id={audioFile.id} name={audioFile.name} src={audioFile.src} playAudioFile={this.playAudioFile} delAudioFile={this.delAudioFile}/>
            ))}
          </div>          
        </div>
      );
    }
}
  
const AudioFile = (props) => {
    return (
      <div className="audio-file">
        <button className="library-play-btn" onClick={props.playAudioFile}>P</button>
        <p>{props.name}</p>
        <button className="library-del-btn" onClick={props.delAudioFile}>X</button>
        <audio id={props.id} src={props.src} type={props.type}></audio>
        
      </div>
    );
}

export default Library;