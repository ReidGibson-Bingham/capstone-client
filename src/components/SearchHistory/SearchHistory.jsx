import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SearchHistory.scss';

const SearchHistory = (props) => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const outputContainerRef = useRef(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {

    const getData = async () => {

        try {
            const response = await axios.get('http://localhost:8080/api/products');
            // Extract numeric values from the price strings
            const extractNumber = (priceString) => {
                const matches = priceString.match(/[0-9,]+[.]?[0-9]*/);
                if (matches && matches.length > 0) {
                return parseFloat(matches[0].replace(/,/g, ''));
                }
                return 0; // Default value if no numeric value is found
            };
  
            // Sort based on the extracted numeric values
            const sortedProductData = response.data.sort((a, b) => {
                const aPrice = extractNumber(a.price);
                const bPrice = extractNumber(b.price);
                return aPrice - bPrice;
            });

            setProductData(sortedProductData);

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

  return (
    <div className="search-history">
      <div className="search-history__item-box" ref={outputContainerRef}>
        {
            productData
                .slice(400, 450)
                .map((product, index) => (
                
                <div key={index} className='search-history__item'>

                    <img className='search-history__item-img' 
                        src={product.imagePath}
                        onClick={() => openModal(product)}
                    >

                    </img>

                    <ul className='search-history__item-info'>
                        <li><span className='search-history__item-title'>$Product </span> = {product.title}</li>
                        <li><span className='search-history__item-title'>$Price </span> = {product.price}</li>
                        <li><span className='search-history__item-title'>$Brand </span> = {product.brand}</li>
                    </ul>

                </div>
                
            ))
        }
      </div>

    </div>
  );
};

export default SearchHistory;