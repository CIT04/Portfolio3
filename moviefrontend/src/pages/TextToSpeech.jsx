
import { Button } from 'react-bootstrap'; // Import Button component from Bootstrap
import React, { useEffect, useState } from 'react';


const TextToSpeech = ({textToRead, voice, rate  }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  const handleSpeak = () => {
    if (textToRead) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.voice = voice ? voices.find(v => v.name === voice) : window.speechSynthesis.getVoices()[0];
      utterance.rate = rate || 1;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div>
      <Button onClick={handleSpeak} disabled={isSpeaking}>
        {isSpeaking ? 'Speaking...' : 'Read Plot'}
      </Button>
    </div>
  );
};

export default TextToSpeech;
