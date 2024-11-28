/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from './ContextAPI/CartContext';
import Footer from "../../../Components/Footer/Footer";
import Header from '../../../Components/Header/Header';

function ViewProduct() {
  const navigate = useNavigate();

  const { cart, dispatch } = useCart();

  // Example product data
  const product = {
    id: 1, // Replace with dynamic product ID
    title: "Barcelona Home",
    thumbnail: "../shopping.webp",
    price: 30, // Replace with dynamic product price
    quantity: 1, // Initial quantity
    totalprice: 30 // Initial total price
  };

 

  const addToCart = () => {
 
      const updatedProduct = {
        ...product,
     
      };
      dispatch({ type: 'ADD_TO_CART', item: updatedProduct });
    
  };

  return (
    <div className="">
      <Header hideLocationElement={true} />
      <div className="bg-light">
        <nav className="pt-2 bg-light mt-1">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/shop" style={{ fontSize: "small" }}>
                shop
              </Link>
            </li>
            <li className="breadcrumb-item active">Product</li>
          </ol>
        </nav>
        <div className="container-fluid turfcont ps-5 pt-5 pe-5 pb-5 bg-light border">
          <div className="row">
            <div className="col-md-7">
              <p style={{ fontSize: "1.7rem", fontWeight: "bolder" }}>
                {product.title}
              </p>
              <img
                className="img"
                src={product.thumbnail}
                alt="product"
              />
            </div>
            <div className="col-md-5 border p-3 mt-5">
              <div className="container border mt-4 mb-3">
                <p style={{ fontSize: "1.3rem", marginTop: "10px" }}>
                  {product.title}
                </p>
                <p style={{ fontSize: "0.8rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
               
                </p>
                {/* <p style={{ fontSize: "0.8rem" }}>
                  Size chart
                  <select className="form-select" value={size} onChange={handleSizeChange}>
                    <option value="">Select Size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">Extra Large</option>
                  </select>
                </p> */}
                <h3>₹{product.price}</h3>
              </div>
              <div className='d-flex gap-5 justify-content-center'>
                <button
           
                  className="btn btn-primary btn-rounded p-3 mb-3"
                  onClick={addToCart}
                >
                  Add to Cart
                </button> 
                <Link to="/shopcart" >
                  <button  onClick={addToCart} className="btn btn-success btn-rounded text-light p-3">Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewProduct;
