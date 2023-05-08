import Header from "components/Headers/Header";
import React, { useEffect } from "react";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "./chatBack.css";
import { useState } from "react";

function ChatBackOffice(props) {
    const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/chat/badwords/")
      .then((response) => response.json())
      .then((data) => {
        const wordsArray = data.map((obj) => obj.word);
        setWords(wordsArray);
      })
      .catch((error) => console.error(error));
  }, []);
  

  const handleRemoveWord = (wordToRemove) => {
    setWords(words.filter((word) => word !== wordToRemove));
  
    fetch(`http://localhost:5000/chat/badwords/${wordToRemove}`, {
      method: "DELETE"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete the word");
      }
    })
    .catch(error => {
      console.error(error);
    });
  };
  
  const handleAddWord = async () => {
    if (inputValue.trim() !== "") {
      const newWord = inputValue.trim();
      setWords([...words, newWord]);
      setInputValue("");
  
      try {
        const response = await fetch("http://localhost:5000/chat/badwords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ word: newWord }),
        });
        if (!response.ok) {
          throw new Error("Failed to add new word.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <>
      <Header />
      {/* Page content */}
      <CardHeader className="bg-transparent border-0"></CardHeader>
      <h1 className="continput-container">BadWords</h1>
      <div className="continput-container">
        <input
          type="text"
          placeholder="Enter a word"
          className="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddWord();
            }
          }}
        />
        <button className="add-button" onClick={handleAddWord}>
          Add
        </button>
      </div>

      <div className="cont">
        <ul>
          {words?.map((word) => (
            <li key={word}>
              <span className="word">{word}</span>
              <button
                className="remove-button"
                onClick={() => handleRemoveWord(word)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ChatBackOffice;
