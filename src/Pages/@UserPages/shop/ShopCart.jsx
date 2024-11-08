import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './ContextAPI/CartContext';
import Header from '../../../Components/Header/Header';


function ShopCart() {
  const { cart, dispatch } = useCart()
console.log(cart);

//totalprice
  const total = cart.reduce((acc, product) => acc + (product.totalprice || 0), 0);

  //cart actions
  const removeFromCart = (id,size) => {
    dispatch({ type: 'REMOVE_FROM_CART', id,size });
  };

  const increaseQuantity = (id,size) => {
    console.log("increas");
    dispatch({ type: 'INCREASE_QUANTITY', id,size });
  };

  const decreaseQuantity = (id,size) => {
    dispatch({ type: 'DECREASE_QUANTITY', id ,size});
  };

  const emptyCart = () => {
    dispatch({ type: 'EMPTY_CART' });
  };
const[isMobile]=useState(window.sc)
  return (
    <>
    <Header hideLocationElement={true}/>
    <div className="container " style={{ marginTop: "100px", minHeight: "53vh" }}>
      <div className="row mt-5">
        <div className="col-lg-8 col-sm-12 mt-5">
          <div className='table-responsive'>
          <table className="table shadow">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.length > 0 ? (
                cart.map((product, index) => (
                  <tr  key={`${product.id}-${product.size}`}>
                    <td>{index + 1}</td>
                    <td>{product?.title}-size-{product.size}</td>
                    <td><img src={product?.thumbnail} width={100} alt="" /></td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-sm btn-secondary me-2" onClick={() => decreaseQuantity(product.id,product.size)}>
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button className="btn btn-sm btn-primary ms-2" onClick={() => increaseQuantity(product.id,product.size)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{product?.totalprice}</td>
                    <td>
                      <button className="btn" onClick={() => removeFromCart(product.id,product.size)}>
                        <i className="fa-solid fa-trash text-danger"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Your cart is empty</td>
                </tr>
              )}
            </tbody>
      
          </table>
          </div>
          <div className="float-end d-flex gap-2">
            <button className="btn btn-warning" onClick={emptyCart}>Empty Cart</button>
            <Link to="/shop" style={{ textDecoration: "none" }}>
              <button className="btn btn-success">Shop More</button>
            </Link>
          </div>  
        </div>
        <div className="col-lg-3 col-sm-12 d-flex justify-content-center">
          <div className="container border rounded shadow mt-5 p-4 w-100">
            <h3>Cart Summary</h3>
            <h4>Total Products: {cart?.length}</h4>
            <h5>Total: <span className="text-danger fw-bolder">₹{total.toFixed(2)}</span></h5>
            <div className="text-center">
            <button className="btn btn-success mt-5 w-100 text-center">Checkout</button>
          </div>
          </div>
        
        </div>
      </div>
    </div>
    </>
  );
}

export default ShopCart;
