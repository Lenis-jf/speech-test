import { useState } from "react";

function SpeechSandbox() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    let recognition;

    // Este método inicializa el reconocimiento
    const initRecognition = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Tu navegador no soporta la Web Speech API 😢");
            return;
        }

        recognition = new SpeechRecognition();
        recognition.lang = "es-ES"; // puedes cambiar el idioma
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
            <p>Presiona el botón y habla para ver qué pasa.</p>

            <button onClick={startListening} disabled={isListening}>
                {isListening ? "Escuchando..." : "Comenzar"}
            </button>
            <button onClick={stopListening} disabled={!isListening}>
                Detener
            </button>

            <p style={{ marginTop: "1rem" }}>🗣️ <strong>{transcript}</strong></p>
        </div>
    );
}

export default SpeechSandbox;
