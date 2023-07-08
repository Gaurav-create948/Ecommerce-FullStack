import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAuth from './UserAuth.js';
import Footer from './Footer.js';
import Cookies from 'js-cookie';
import { AuthContext } from './Context/authContext.js';

const Navbar = ({ setProducts }) => {

  const {setForm} = useContext(AuthContext);


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
    <div className='flex flex-wrap my-10'>
      <div className='logo w-[20%] mx-auto text-center'>
        <h2 className='text-slate-700 text-3xl'><Link>Shop Now</Link></h2>
      </div>
      <div className='w-[60%] flex border rounded-md border-slate-300'>
        <input className="block w-full rounded-md px-3.5 py-2 shadow-sm" type="text" placeholder='search' />
        <i className="fa-solid fa-magnifying-glass text-3xl mx-2 my-2" type="submit" onClick={handleSubmit}></i>
      </div>
      <div className="flex mx-auto ml-auto w-[20%]">
        <Link to={'/cart'}>
          <i className="fa-solid fa-cart-arrow-down text-3xl mx-2 my-2"></i>
        </Link>
        <i className="fa-solid fa-user text-3xl mx-2 my-2 hover:cursor-pointer" onClick={() => setForm()}></i>
        {/* <p className='cursor-pointer' onClick={handleClick}>Logout</p> */}
      </div>
    </div>

  )
}

export default Navbar