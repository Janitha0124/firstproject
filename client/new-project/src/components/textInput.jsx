import React, { useState } from "react";

export default function TextInput() {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);

  const handleInput = () => {
    const separatedText = text
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && !texts.includes(t));
    setTexts([...texts, ...separatedText]);
    setText("");
  };

  const handleDelete = (indexToDelete) => {
    setTexts(texts.filter((_, index) => index !== indexToDelete));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInput();
    }
  };

  return (
    <div>
      <p className="ml-5 mt-5">Input Here</p>
      <input
        className="border-2 mt-2 ml-5 rounded-lg px-2 py-1"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ul className="flex flex-wrap ml-5 mt-4">
        {texts.map((text, index) => (
          <li
            key={index}
            className="border bg-green-200  px-3 py-1 mr-2 mb-2 rounded-2xl flex item-center"
          >
            {text}
            <button
              className="ml-2 bg-green-300 rounded-full px-2 text-sm"
              onClick={() => handleDelete(index)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
