import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './FavouritesList.scss';

import Modal from 'react-modal';
import './ItemModal.scss';
import {formatString, convertGBPtoCAD} from '../../utils/utils';

Modal.setAppElement('#root');

const ItemModal = ({ isOpen, onRequestClose, item, removeItem }) => {

  const [sizingValue, setSizingValue] = useState('');
  const [descValue, setDescValue] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sizing') {
      setSizingValue(value);
    } else if (name === 'description') {
      setDescValue(value);
    }
  }

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
      base: 'item-modal',
      afterOpen: 'item-modal__content',
      beforeClose: 'item-modal__content',
    }}
    ClassName={{
      base: 'item-modal__overlay',
      afterOpen: 'item-modal__overlay',
      beforeClose: 'item-modal__overlay',
    }}
    style={modalStyle}
  >
    
      <div className='item-modal'>

          <div className='item-modal__content-container'>

              <img className='item-modal__img' src={item.imagePath} alt='detailed product modal image'></img>
              <div className='item-modal__info-container'>
                  <h2 className='item-modal__title'>{formatString(item.title)}</h2>
                  <p className='item-modal__message'>price: {formatString(item.price).startsWith('£') ? convertGBPtoCAD(formatString(item.price)) : formatString(item.price).startsWith('￥') ? convertYENtoCAD(formatString(item.price)) : formatString(item.price)}</p>
                  <p className='item-modal__message'>brand: {formatString(item.brand)}</p>
                  <p className='item-modal__message-link'>where to buy / further info:
                      <a href={item.itemURL} target="_blank">
                          { item.itemURL}
                      </a>
                  </p>

                  <form className='item-modal__form-box'>

                      <input
                        type='text'
                        name='sizing'
                        value={sizingValue}
                        onChange={handleInputChange}
                        placeholder='enter size info'
                      />

                      <input
                        type='text'
                        name='description'
                        value={descValue}
                        onChange={handleInputChange}
                        placeholder='enter description'
                      />

                      <button className='item-modal__button-save'>$Save</button>
                      <div className='item-modal__close-button-box'>
                          <button onClick={removeItem} className="item-modal__close-btn">
                             XRemove
                          </button>
                      </div>
                  </form>

              </div>

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

                    <ul className='favourites-list__item-info' onClick={() => openModal(product)}>
                        <li><span className='favourites-list__item-title'>$Product </span> = {formatString(product.title)}</li>
                        <li><span className='favourites-list__item-title'>$Price </span> = {formatString(product.price).startsWith('£') ? convertGBPtoCAD(formatString(product.price)) : formatString(product.price).startsWith('￥') ? convertYENtoCAD(formatString(product.price)) : formatString(product.price)}</li>
                        <li><span className='favourites-list__item-title'>$Brand </span> = {formatString(product.brand)}</li>
                    </ul>

                    <ItemModal
                        isOpen={isModalOpen && selectedProduct === product}
                        onRequestClose={() => {
                          setIsModalOpen(false);
                        }}
                        item={product}
                        removeItem={handleRemove}
                    />

                </div>
                
            )).reverse()
        }
      </div>

    </div>
  );
};

export default FavouritesList;