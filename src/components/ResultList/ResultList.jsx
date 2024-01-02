import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ResultList.scss';

const Terminal = () => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const outputContainerRef = useRef(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {

    const getData = async () => {

        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProductData(response.data);
            console.log("the response from the server: ", response.data);
        } catch (error) {
            console.log("error fetching data: ", error);
        }

    }

    getData();

  }, [])

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
    <div className="results">
      <div className="results__item-box" ref={outputContainerRef}>
        {
            productData.map((product, index) => (
                <div key={index} className='results__item'>

                    <ul className='results__item-info'>
                        <li><span className='results__item-title'>$Product </span> = {product.title}</li>
                        <li><span className='results__item-title'>$Price </span> = {product.price}</li>
                        <li><span className='results__item-title'>$Brand </span> = {product.brand}</li>
                    </ul>
                    
                </div>
            ))
        }
      </div>
      {/* <div className="input-container">
        <span className="prompt">$</span>
        <input
          type="text"
          name="search"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleEnter}
        />
      </div> */}
    </div>
  );
};

export default Terminal;