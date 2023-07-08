import React, { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
// import { checkUser, getCookie } from './CheckValidUser';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useQuery, QueryClient } from 'react-query';
import { AuthContext } from './Context/authContext';
import Overlay from './Overlay';
import UserAuth from './UserAuth';


// here i will show all the data.
const ProductInfo = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState();
  const [card, setCard] = useState(false);
  const { showForm, currentUser, setForm } = useContext(AuthContext);


  useEffect(() => {
    const getProduct = async () => {
      try {
        const prodData = await axios.get(`https://fakestoreapi.com/products/${_id}`);
        setProduct(prodData.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, [])

  async function addToCart() {
    try {
      const res = await axios.post('http://localhost:5000/product/cart', { product, currentUser });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='flex'>
      {showForm && <Overlay />}
      {showForm && <UserAuth />}
      {
        !product ? <CircularProgress /> :
          <>
            <div className='w-1/2 basis-1/2'>
              <img className='w-[400px] block mx-auto my-10' src={product.image} alt="product-image" />
            </div>

            <div className='basis-1/2 font-[inter] py-10'>
              <h1 className='text-2xl my-10'>{product.title}</h1>
              <h3 className='text-2xl my-10'>price : ${product.price}</h3>
              <p className='text-md justify-left'>{product.description}</p>
              <button className='bg-amber-300 hover:bg-amber-400 w-[40%] mx-5 my-10 p-3'
                onClick={(e) => {
                  e.preventDefault();
                  if (currentUser) {
                      console.log(currentUser);
                      addToCart();
                      setCard(true);
                  } else {
                    setForm();
                  }

                }}>
                CART
              </button>
              <button className='bg-amber-300 hover:bg-amber-400 w-[40%] mx-5 my-10 p-3'>BUY NOW</button>
            </div>
          </>
      }
      {      
        card &&
        <div className='confirm-card absolute left-100 right-10  px-5 py-5 bg-white drop-shadow-xl'>
        <i className="fa-solid fa-circle-check text-[#12d943] text-5xl"></i>
        {
          product &&
          <div className='w-[200px] h-[350px]'>
            <p>{product.title}</p>
            <img src={product.image} className=''/>
            <Link to='/cart' className='bg-amber-300 px-5 py-2'>
              Go to cart
            </Link>
          </div>
        }
      </div>
      }
    </div>
  )
}


export default ProductInfo