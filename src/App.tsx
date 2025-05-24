import React from 'react';
import Listener from 'components/Listener';

const App = () => {
  if (!('webkitSpeechRecognition' in window)) {
    return <div>только хром</div>;
  }

  return <Listener />;
};

export default App;
