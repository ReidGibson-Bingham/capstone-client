import React, { useState, useEffect, useRef } from 'react';
import './ResultList.scss';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const outputContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the output container when output changes
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      // Handle the entered command (e.g., execute a command or show a response)
      processCommand(input);

      // Clear the input field
      setInput('');
    }
    if (input === 'clear') {
      setOutput(['']);
    }
  };

  const processCommand = (command) => {
    // For simplicity, let's just echo the command for now
    const newOutput = [
      ...output,
      { type: 'input', text: command },
      { type: 'output', text: `Command: ${command}` },
    ];

    setOutput(newOutput);

    // You can add more logic here to handle command processing
  };

  return (
    <div className="terminal">
      <div className="output" ref={outputContainerRef}>
        {output.map((item, index) => (
          <div key={index} className={item.type}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <span className="prompt">$</span>
        <input
          type="text"
          name="search"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleEnter}
        />
      </div>
    </div>
  );
};

export default Terminal;