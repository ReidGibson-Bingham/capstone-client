import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './FavouritesList.scss';

import Modal from 'react-modal';
import './ItemModal.scss';

Modal.setAppElement('#root');

const ItemModal = ({ isOpen, onRequestClose, item }) => {

  const modalStyle = {
    overlay: {
      backgroundColor: '#13182cc7',
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      className={{
        base: 'deletion-modal',
        afterOpen: 'deletion-modal__content',
        beforeClose: 'deletion-modal__content',
      }}
      ClassName={{
        base: 'deletion-modal__overlay',
        afterOpen: 'deletion-modal__overlay',
        beforeClose: 'deletion-modal__overlay',
      }}
      style={modalStyle}
    >
      <div>
        <div className='deletion-modal__close-button-box'>
          <button onClick={onRequestClose} className="deletion-modal__close-btn">
            X
          </button>
        </div>

        <div className='deletion-modal__info-container'>

        <img className='deletion-modal__img' src={item.imagePath} alt='detailed product modal image'></img>
        <div>
            <h2 className='deletion-modal__title'>{item.title}</h2>
            <p className='deletion-modal__message'>price: {item.price}</p>
            <p className='deletion-modal__message'>brand: {item.brand}</p>
            <p className='deletion-modal__message-link'>where to buy / further info:
                <a href={item.itemURL} target="_blank">
                    {item.itemURL}
                </a>
            </p>
        </div>

        </div>

      </div>
      
    </Modal>
  );
};

const FavouritesList = (props) => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const outputContainerRef = useRef(null);
  const [productData, setProductData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    console.log("openModal function engaged. ")
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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
  
            console.log("the response from the server: ", sortedProductData);
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
    <div className="favourites-list">
      <div className="favourites-list__item-box" ref={outputContainerRef}>
        {
            productData
                .slice(400, 450)
                .map((product, index) => (
                
                <div key={index} className='favourites-list__item'>

                    <img className='favourites-list__item-img' 
                        src={product.imagePath}
                        onClick={() => openModal(product)}
                    >

                    </img>

                    <ul className='favourites-list__item-info'>
                        <li><span className='favourites-list__item-title'>$Product </span> = {product.title}</li>
                        <li><span className='favourites-list__item-title'>$Price </span> = {product.price}</li>
                        <li><span className='favourites-list__item-title'>$Brand </span> = {product.brand}</li>
                    </ul>

                    <ItemModal
                        isOpen={isModalOpen && selectedProduct === product}
                        onRequestClose={() => {closeModal()}}
                        item={product}
                    />

                </div>
                
            ))
        }
      </div>

    </div>
  );
};

export default FavouritesList;