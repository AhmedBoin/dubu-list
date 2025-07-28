import "./AddButton.css";
import React, { useEffect, useState } from "react";
import bubuWrite from '../assets/bubuWrite.gif';
import bubuWriteStatic from '../assets/bubuWriteStatic.png';
import duduWrite from '../assets/duduWriting.gif';
import duduWriteStatic from '../assets/duduWritingStatic.png';

export default function AddButton({ onClick , state, mode}) {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (state) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [state]);

  return (
    <button
      className="add-button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => state ? setIsHovered(true) : setIsHovered(false)}
    >
      <img
        className="add-button-image"
        key={isHovered ? "gif" : "static"}
        src={isHovered ? ( mode ? bubuWrite : duduWrite) : (mode ? bubuWriteStatic : duduWriteStatic)}
        alt="Add"
      />
    </button>
  );
}