import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Search.scss';


const Search = (props) => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const outputContainerRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the output container when output changes
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }

  }, [output]);

  useEffect(() => {

    if (props.navigated) {
      const newOutput = [
        ...output,
        { type: 'input', text: 'Search' },
        { type: 'output', text: `${props.navLinkSearchData}` },
      ];
      setOutput(newOutput);
    }

  }, [props.navigated])

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsInputFocused(true)
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      // Handle the entered command (e.g., execute a command or show a response)
      processCommand(input);
      
      props.onChange(input)
      console.log("props.onChange used. it's input: ", input);
      // Clear the input field
      setInput('');
    }
    if (input === 'clear') {
      setOutput(['']);
    }
    setIsInputFocused(false)
  };

  const processCommand = (command) => {
    // For simplicity, let's just echo the command for now
    const newOutput = [
      ...output,
      { type: 'input', text: 'Search' },
      { type: 'output', text: `${command}` },
    ];

    setOutput(newOutput);

    const postSearchTerm = async () => {

      const searchPostData = { searchTerm: command }

      try {
        const response = await axios.post("http://localhost:8080/api/users/searchHistory", searchPostData)
        if (response.status === 201) {
          console.log("successfully saved new favourite: ", response);
        } else {
          console.log("erroneous response posting to search history: ", response);
        }
      } catch (err) {
        console.log("the frontend error posting the search term: ", err);
      }

    }

    postSearchTerm();
    
  };

  return (
    <div className="search">
      <div className="output" ref={outputContainerRef}>
        {output.map((item, index) => (
          <div key={index} className={item.type}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <span className="prompt">Search:{isInputFocused ? '$' : '>'}</span>
        <input
          type="text"
          name="search"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleEnter}
          onFocus={() => setIsInputFocused(false)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>
    </div>
  );
};

export default Search;