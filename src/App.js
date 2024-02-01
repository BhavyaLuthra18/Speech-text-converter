import "./App.css";
import React, { useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

const App = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 2000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleCopyToClipboard = () => {
    // checking if the text is available in transcript if yes then copy the text to the clipboard
    if (transcript) {
      navigator.clipboard
        .writeText(transcript) // to write text on clipboard
        .then(() => {
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 1000);
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container">
  
        <h2>
        <img src="images/mic.png"/>
          Speech to Text Converter</h2>
     
        <br />
        <p>With speech to text, a user can convert any audio note into textual content quickly.</p>
        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>
        <div className="btn-style">
          <button onClick={handleCopyToClipboard}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>

          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
