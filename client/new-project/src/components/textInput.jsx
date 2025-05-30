import React, { useEffect, useState } from "react";

export default function TextInput() {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/userInput");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTexts(data);
      } else {
        console.error("Invalid data format:", data);
        setTexts([]);
      }
    } catch (error) {
      console.error("Error fetching texts:", error);
      setTexts([]);
    }
  };

  const handleInput = async () => {
    const existingContents = texts.map((item) => item.content.toLowerCase());

    const separatedText = text
      .split(",")
      .map((t) => t.trim())
      .filter(
        (t) => t.length > 0 && !existingContents.includes(t.toLowerCase())
      );

    for (let t of separatedText) {
      await fetch("http://localhost:5000/api/userInput", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: t }),
      });
    }
    fetchTexts();
    setText("");
  };

  const handleDelete = async (id) => {
    // setTexts(texts.filter((_, index) => index !== indexToDelete));
    await fetch(`http://localhost:5000/api/userInput/${id}`, {
      method: "DELETE",
    });
    fetchTexts();
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
            {text.content}
            <button
              className="ml-2 bg-green-300 rounded-full px-2 text-sm"
              onClick={() => handleDelete(text.id)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
