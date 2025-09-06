// src/App.js

import './App.css';
// अगर TextEditor.js फ़ाइल src/components फ़ोल्डर में है
import TextEditor from './components/TextEditor'; // ध्यान दें: यहाँ curly braces {} नहीं हैं

function App() {
  return (
    <div className="App">
      <TextEditor />
    </div>
  );
}

export default App;