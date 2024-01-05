import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './FavouritesList.scss';

import Modal from 'react-modal';
import './ItemModal.scss';

Modal.setAppElement('#root');

const ItemModal = ({ isOpen, onRequestClose, item, removeItem }) => {

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

        <div className='deletion-modal__button-box'>
          <button className='deletion-modal__button-delete' onClick={removeItem}>Remove</button>
        </div>

      </div>
      
    </Modal>
  );
};

const FavouritesList = (props) => {

  const [output, setOutput] = useState([]);
  const outputContainerRef = useRef(null);
  const [productData, setProductData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [retriggerFetchData, setRetriggerFetchData] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {

    const getItems = async (itemIds) => {
      let resData = [];  // Create a new array to hold the updated data
  
      for (const id of itemIds) {
        try {
          const response = await axios.get(`http://localhost:8080/api/products/${id}`);
          resData = [...resData, response.data];
        } catch (error) {
          console.log("frontend error fetching individual product: ", error);
        }
      }
  
      setProductData(resData);
    };
    
    const getUserFavouriteIds = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/favourites');
        getItems(response.data);

      } catch (error) {
        console.log("frontend error fetching favourite Ids", error);
      }
    }

    getUserFavouriteIds();

  }, [retriggerFetchData])

  useEffect(() => {
    // Scroll to the bottom of the output container when output changes
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [output]);

  const handleRemove = async () => {

    const favouriteId = { favouriteId: selectedProduct.id};
    console.log("favourite id: ", favouriteId);

    try {
      const response = await axios.delete('http://localhost:8080/api/users/favourites/', {
        data: favouriteId  // Include the data in the config object
    })

      if (response.status === 200) {

        console.log("successfull response: ", response);
        setRetriggerFetchData(!retriggerFetchData);
        closeModal();
        
      } else {
        console.log("error removing the favourite item", response);
      }

    } catch (err) {
      console.log("frontend error deleting favourite item: ", err);
    }

  }

  return (
    <div className="favourites-list">
      <div className="favourites-list__item-box" ref={outputContainerRef}>
        <h1 className='favourites-list__title'>$Favourites</h1>
        {
            productData
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
                        removeItem={handleRemove}
                    />

                </div>
                
            ))
        }
      </div>

    </div>
  );
};

export default FavouritesList;