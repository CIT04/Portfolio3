import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Import Button component from Bootstrap



const TextToSpeech = ({ textToRead }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (textToRead) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div>
      {/* Button to trigger text-to-speech */}
      <Button onClick={handleSpeak} disabled={isSpeaking}>
        {isSpeaking ? 'Speaking...' : 'Read Plot'}
      </Button>
    </div>
  );
};

export default TextToSpeech;
