import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAuth from './UserAuth.js';
import Footer from './Footer.js';
import Cookies from 'js-cookie';
import { AuthContext } from './Context/authContext.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setProducts }) => {

  const { currentUser, setForm } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [showDropDown, setShowDropDown] = useState();
  const navigate = useNavigate();


  const searchValues = ["electronics", "jewelery", "men's clothing", "women's clothing"];


  async function handleSubmit() {
    const searchElement = document.querySelector('input');
    if (!searchValues.includes(searchElement.value)) return;
    const products = JSON.parse(localStorage.getItem('allProducts'));
    const filteredData = products.filter(product => product.category === searchElement.value);
    searchElement.value = '';
    setProducts(filteredData);
  }

  function logoutUser(){
    localStorage.removeItem('user');
    axios.post('https://ecommerce-app-jof9.onrender.com/logout', { }, {withCredentials:true});
    navigate(0);
  }

  return (
    <div className='container flex item-center justify-around my-10'>

      <Link to='/' className='my-auto'>
        <img src='../images/ecommerce-logo.png' className='h-[100px] w-[100px]' />
      </Link>


      <div className='flex w-[35%] my-auto'>
        <input className="w-full p-3 outline-none border-b-[1.5px] border-slate-200" type="text" placeholder='search' />
        <i className="fa-solid fa-magnifying-glass m-auto text-2xl" type="submit" onClick={handleSubmit}></i>
      </div>

      <div className='flex my-auto gap-2'>
        <Link to='/cart'>
          <i className="fa-solid fa-cart-arrow-down text-3xl mx-2 my-2"></i>
        </Link>
        {
          !currentUser ? 
            <button className='bg-black px-3 py-2 m-auto text-white' onClick={setForm}>Sign in</button> 
          :
            <div className='m-auto'>
              <span className='mr-1'>{currentUser}</span>
              <button className='bg-black px-3 py-2 m-auto text-white' onClick={logoutUser}>Logout</button>
            </div>
        }
      </div>
    </div>

  )
}

export default Navbar