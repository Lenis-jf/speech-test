import { useState } from "react";

function SpeechSandbox() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    let recognition;

    const initRecognition = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Tu navegador no soporta la Web Speech API 😢");
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
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h2>🎙️ Web Speech API Sandbox</h2>
            <p>Press the button and speak to see what happens.</p>

            <button onClick={startListening} disabled={isListening}>
                {isListening ? "Listening..." : "Start"}
            </button>
            <button onClick={stopListening} disabled={!isListening}>
                Stop
            </button>

            <p style={{ marginTop: "1rem" }}>🗣️ <strong>{transcript}</strong></p>
        </div>
    );
}

export default SpeechSandbox;
