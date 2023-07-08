import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAuth from './UserAuth.js';
import Footer from './Footer.js';
import Cookies from 'js-cookie';
import { AuthContext } from './Context/authContext.js';

const Navbar = ({ setProducts }) => {

  const { setForm } = useContext(AuthContext);


  const searchValues = ["electronics", "jewelery", "men's clothing", "women's clothing"];


  async function handleSubmit() {
    const searchElement = document.querySelector('input');
    if (!searchValues.includes(searchElement.value)) return;
    const products = JSON.parse(localStorage.getItem('allProducts'));
    const filteredData = products.filter(product => product.category === searchElement.value);
    searchElement.value = '';
    setProducts(filteredData);
  }

  return (
    <div className='container flex item-center justify-around my-10'>

      <Link to='/' className='my-auto'>
        <img src='../images/ecommerce-logo.png' className='h-[100px] w-[100px]' />
      </Link>


      <div className='flex w-[45%] my-auto'>
        <input className="w-full p-3 outline-none border-b-[1.5px] border-slate-200" type="text" placeholder='search' />
        <i className="fa-solid fa-magnifying-glass m-auto text-2xl" type="submit" onClick={handleSubmit}></i>
      </div>

      <div className='flex my-auto gap-5'>
        <Link to='/cart'>
          <i className="fa-solid fa-cart-arrow-down text-3xl mx-2 my-2"></i>
        </Link>
        <i className="fa-solid fa-user text-3xl mx-2 my-2 hover:cursor-pointer" onClick={() => setForm()}></i>
        {/* <p className='cursor-pointer' onClick={handleClick}>Logout</p> */}
      </div>
    </div>

  )
}

export default Navbar