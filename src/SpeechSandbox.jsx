import { useState } from "react";
import "./main-test.css"

function SpeechSandbox() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    let recognition;

    const initRecognition = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("API is not supported in this browser.");
            return;
        }

        recognition = new SpeechRecognition();
        recognition.lang = "de-DE";
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const text = event.results[current][0].transcript;
            setTranscript(text);
        };

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
    };

    const startListening = () => {
        if (!recognition) initRecognition();
        recognition.start();
    };

    const stopListening = () => {
        if (recognition) recognition.stop();
    };

    return (
        <div className="main-container">
            <h2>🎙️ Web Speech API Sandbox</h2>
            <p>Press the button and speak to see what happens.</p>

            <div className="buttons-container">
                <button onClick={startListening} disabled={isListening}>
                    {isListening ? "Listening..." : "Start"}
                </button>
                <button onClick={stopListening} disabled={!isListening}>
                    Stop
                </button>
            </div>

            <p className="transcript" style={{ marginTop: "1rem" }}>🗣️ <strong>{transcript}</strong></p>
        </div>
    );
}

export default SpeechSandbox;
