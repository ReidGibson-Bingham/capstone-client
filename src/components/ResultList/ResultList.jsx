import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ResultList.scss';

import Modal from 'react-modal';
import './ItemModal.scss';

Modal.setAppElement('#root');

const ItemModal = ({ isOpen, onRequestClose, item, save }) => {

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
          <button className='deletion-modal__button-delete' onClick={save} >Save</button>
        </div>

      </div>
      
    </Modal>
  );
};

const Terminal = (props) => {

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
  
            // console.log("the response from the server: ", sortedProductData);
        } catch (error) {
            console.log("error fetching data: ", error);
        }

    }

    getData();

  }, [props.searchTerm])

  useEffect(() => {
    // Scroll to the bottom of the output container when output changes
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [output]);

  const handleSave = async () => {
    const favouritePostData = { favouriteId: selectedProduct.id};
    try {   
        const response = await axios.post('http://localhost:8080/api/users/favourites/', favouritePostData);
        if (response.status === 201) {
            console.log("successfully saved new favourite: ", response);
            closeModal();
        } else {
            console.log("erroneous response: ", response);
        }
    } catch (error) {
        console.log("frontend error saving data: ", error);
    }
  }

  return (
    <div className="results">
      <div className="results__item-box" ref={outputContainerRef}>
        {
            productData
                .filter(product => {
                    const formattedTitle = product.title.toLowerCase().replace(/\s/g, '');
                    const formattedBrand = product.brand.toLowerCase().replace(/\s/g, '');
                    const formattedSearchTerm = props.searchTerm.toLowerCase().replace(/\s/g, '');
                    return formattedTitle.includes(formattedSearchTerm) || formattedBrand.includes(formattedSearchTerm);
                }) // Filter products based on the case-insensitive and space-insensitive search for title and brand
                .map((product, index) => (
                
                <div key={index} className='results__item'>

                    <img className='results__item-img' 
                        src={product.imagePath}
                        onClick={() => openModal(product)}
                    >

                    </img>

                    <ul className='results__item-info' onClick={() => openModal(product)}>
                        <li><span className='results__item-title'>$Product </span> = {product.title}</li>
                        <li><span className='results__item-title'>$Price </span> = {product.price}</li>
                        <li><span className='results__item-title'>$Brand </span> = {product.brand}</li>
                    </ul>

                    <ItemModal
                        isOpen={isModalOpen && selectedProduct === product}
                        onRequestClose={() => {closeModal()}}
                        item={product}
                        save={handleSave}
                    />

                </div>
                
            ))
        }
      </div>

    </div>
  );
};

export default Terminal;