import React, { useState } from 'react';
import './TextEditor.css';

const TextEditor = () => {
  const [text, setText] = useState('');
  const [findWord, setFindWord] = useState('');
  const [replaceWith, setReplaceWith] = useState('');
  const [alert, setAlert] = useState(null);
  const [replacementCount, setReplacementCount] = useState(0);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleFindWordChange = (event) => {
    setFindWord(event.target.value);
  };

  const handleReplaceWithChange = (event) => {
    setReplaceWith(event.target.value);
  };

  const handleReplaceWord = () => {
    if (findWord.trim() === '') {
      showAlert('Please enter a word to find!');
      return;
    }

    const regex = new RegExp(findWord, 'g');
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;
    
    if (count > 0) {
      const newText = text.replaceAll(findWord, replaceWith);
      setText(newText);
      setReplacementCount(count);
      showAlert(`${count} word(s) replaced successfully!`);
    } else {
      showAlert('No matching words found.');
    }
  };

  const handleRemoveDuplicates = () => {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const uniqueWords = [...new Set(words)];
    const newText = uniqueWords.join(' ');
    setText(newText);
    showAlert('Duplicate words removed!');
  };

  const handleExtraSpaces = () => {
    let newText = text.replace(/\s{2,}/g, ' ');
    setText(newText);
    showAlert('Extra spaces removed!');
  };

  const handleUpperCase = () => {
    setText(text.toUpperCase());
    showAlert('Converted to uppercase!');
  };

  const handleLowerCase = () => {
    setText(text.toLowerCase());
    showAlert('Converted to lowercase!');
  };

  const handleSentenceCase = () => {
    let newText = text.toLowerCase().split('. ');
    let finalText = newText.map(sentence => {
      if (sentence.length > 0) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      return sentence;
    }).join('. ');
    setText(finalText);
    showAlert('Converted to sentence case!');
  };

  const handleToggleCase = () => {
    let newText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (char === char.toUpperCase()) {
        newText += char.toLowerCase();
      } else {
        newText += char.toUpperCase();
      }
    }
    setText(newText);
    showAlert('Converted to toggle case!');
  };

  const handleClearText = () => {
    setText('');
    setReplacementCount(0);
    showAlert('Text cleared!');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    showAlert('Text copied to clipboard!');
  };

  // Counting logic
  const words = text.split(/\s+/).filter(word => word.length !== 0);
  const wordCount = words.length;
  const charCount = text.length;
  const numberCount = (text.match(/[0-9]/g) || []).length;
  const specialCharCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const paragraphCount = text.split(/\n+/).filter(p => p.length !== 0).length;
  const extraSpaceCount = (text.match(/\s{2,}/g) || []).length;
  
  const duplicateWordCount = () => {
    const wordFrequency = {};
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanWord.length > 0) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });

    let duplicates = 0;
    for (const word in wordFrequency) {
      if (wordFrequency[word] > 1) {
        duplicates += 1;
      }
    }
    return duplicates;
  };

  return (
    <div className="container">
      {alert && <div className="alert-message">{alert}</div>}
      <h1>Text Converter</h1>
      <textarea
        className="form-control"
        value={text}
        onChange={handleOnChange}
        rows="8"
      ></textarea>

      <div className="replace-section">
        <input 
          type="text" 
          placeholder="Word to find" 
          value={findWord} 
          onChange={handleFindWordChange} 
          className="replace-input"
        />
        <input 
          type="text" 
          placeholder="Replace with" 
          value={replaceWith} 
          onChange={handleReplaceWithChange} 
          className="replace-input"
        />
        <button className="btn btn-warning" onClick={handleReplaceWord}>
          Replace Word
        </button>
      </div>

      <div className="buttons">
        <button className="btn btn-primary" onClick={handleUpperCase}>Capitalize</button>
        <button className="btn btn-primary" onClick={handleLowerCase}>Lowercase</button>
        <button className="btn btn-primary" onClick={handleSentenceCase}>Sentence Case</button>
        <button className="btn btn-primary" onClick={handleToggleCase}>Toggle Case</button>
        <button className="btn btn-secondary" onClick={handleCopyText}>Copy Text</button>
        <button className="btn btn-info" onClick={handleRemoveDuplicates}>Remove Duplicates</button>
        <button className="btn btn-dark" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        <button className="btn btn-danger" onClick={handleClearText}>Clear Text</button>
      </div>

      <div className="stats">
        <h3>Text Summary</h3>
        <p>Total Words: **{wordCount}**</p>
        <p>Duplicate Words: **{duplicateWordCount()}**</p>
        <p>Total Replacements: **{replacementCount}**</p>
        <p>Characters: **{charCount}**</p>
        <p>Numbers: **{numberCount}**</p>
        <p>Special Characters: **{specialCharCount}**</p>
        <p>Extra Spaces: **{extraSpaceCount}**</p>
        <p>Paragraphs: **{paragraphCount}**</p>
      </div>
    </div>
  );
};

export default TextEditor;