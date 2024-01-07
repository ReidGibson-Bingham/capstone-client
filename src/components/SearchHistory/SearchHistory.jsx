import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './SearchHistory.scss';

const SearchHistory = (props) => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const outputContainerRef = useRef(null);
  const [searchHistoryData, setSearchHistoryData] = useState([]);

  useEffect(() => {

    const getData = async () => {

        try {
            const response = await axios.get('http://localhost:8080/api/users/searchHistory');
            console.log("the response.data: ", response.data[0]);
            setSearchHistoryData(response.data[0]);

        } catch (error) {
            console.log("frontend error fetching data: ", error);
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
      <h1 className='search-history__title'>$Search History</h1>
      <div className="search-history__item-box" ref={outputContainerRef}>
        
        {
            searchHistoryData
                .map((searchTerm, index) => (

                  <NavLink 
                    key={index}
                    to={{
                      pathname: '/home',
                    }}
                    state={{navLinkSearchData : searchTerm }}
                    className='search-history__item-a'
                  >

                    <ul className='search-history__item'>

                        <li>{searchTerm}</li>

                    </ul>

                  </NavLink>
                
            )).reverse()
        }
      </div>

    </div>
  );
};

export default SearchHistory;