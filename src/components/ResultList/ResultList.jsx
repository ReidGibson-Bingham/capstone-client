import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ResultList.scss';

import Modal from 'react-modal';
import './ItemModal.scss';

Modal.setAppElement('#root');

const ItemModal = ({ isOpen, onRequestClose, item }) => {

  // couldn't target this with the css so this was the best i could figure out on how to change the background color
//   const modalStyle = {
//     overlay: {
//       backgroundColor: '#13182cc7',
//     }
//   };

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
    //   style={modalStyle}
    >
      <div>
        <div className='deletion-modal__close-button-box'>
          <button onClick={onRequestClose} className="deletion-modal__close-btn">
            X
          </button>
        </div>
        <h2 className='deletion-modal__title'>Delete {item} Inventory Item?</h2>
        <p className='deletion-modal__message'>Please confirm that you’d like to delete {item} from the inventory list. You won’t be able to undo this action.</p>
        <div className='deletion-modal__button-box'>
          <button className='deletion-modal__button-cancel' onClick={onRequestClose}>Cancel</button>
          <button className='deletion-modal__button-delete' >Delete</button>
        </div>
      </div>
      
    </Modal>
  );
};

const Terminal = () => {

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
    console.log("Before closing - isModalOpen:", isModalOpen, "selectedProduct:", selectedProduct);
    setIsModalOpen(false);
    setSelectedProduct(null);
    console.log("After closing - isModalOpen:", isModalOpen, "selectedProduct:", selectedProduct);
  };

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

  return (
    <div className="results">
      <div className="results__item-box" ref={outputContainerRef}>
        {
            productData.map((product, index) => (
                
                <div key={index} className='results__item'>

                    <img className='results__item-img' 
                        src={product.imagePath}
                        onClick={() => openModal(product)}
                    >

                    </img>

                    <ul className='results__item-info'>
                        <li><span className='results__item-title'>$Product </span> = {product.title}</li>
                        <li><span className='results__item-title'>$Price </span> = {product.price}</li>
                        <li><span className='results__item-title'>$Brand </span> = {product.brand}</li>
                    </ul>

                    <ItemModal
                        isOpen={isModalOpen && selectedProduct === product}
                        onRequestClose={() => {closeModal()}}
                        item={product.title}
                    />  

                </div>
                
            ))
        }
      </div>

    </div>
  );
};

export default Terminal;