import React, { useState, useEffect, useContext } from 'react';
import { useQuery, QueryClient, useMutation } from 'react-query';
import axios from 'axios';
// import { AuthContext } from './Context/authContext';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, removeItem, increment, decrement } from './Store/cartSlice';


const UserCart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getCartData() {
            try {
                const { data } = await axios.get('https://ecommerce-app-jof9.onrender.com/cart', { withCredentials: true });
                dispatch(setCart(data));
            }
            catch (error) {
                alert('user not authorized');
            }
        }
        getCartData();
    }, []);

    function updateQuantity(e, id){
        const btn = e.target.closest('.btn').textContent;
        if(btn === '+'){
            //increase quantity
            dispatch(increment(id));
        }
        else{
            //decrease quantity
            dispatch(decrement(id));
        }
    }

    function deleteItem(user_id, product_id){
        axios.patch('https://ecommerce-app-jof9.onrender.com/deleteCartItem', {user_id, product_id});
    }

    return (
        <div className='container flex gap-10 mt-[10%]'>
            <div className='container flex flex-col gap-10 left'>
                <div className='headings flex item-left justify-around text-slate-400 font-[Montserrat] font-light'>
                    <p>product</p>
                    <p>quantity</p>
                    <p>price</p>
                </div>
                {
                    cart && cart.map(data =>
                        <div key={data.product_id} className='cart-data flex justify-around'>
                            <div className='w-[35%] flex justify-around gap-2'>
                                <img className='w-[150px]' src={data.product_image} alt='product-image' />
                                <span className='flex m-auto'>{data.product_title}</span>
                            </div>
                            <div className='flex gap-5 m-auto'>
                                <div className='flex py-3 px-3 gap-3 border border-solid border-slate-500' onClick={(e)=>updateQuantity(e, data.product_id)}>
                                    <button className='btn bg-slate-300 px-2'>+</button>
                                    <span className='price'>{data ? data.product_quantity : 'loading...'}</span>
                                    <button className='btn bg-slate-300 px-2'>-</button>
                                </div>
                                <i
                                    className="fa-regular fa-trash-can text-slate-500 m-auto"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(removeItem(data.product_id));
                                        deleteItem(data.user_ref_id, data.product_id);
                                    }}>
                                </i>

                            </div>
                            <div className='flex m-auto'>
                                <p>$ {data.product_quantity * data.product_price}</p>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className='right w-[30%] h-fit bg-slate-50 py-20 px-10'>
                <p className='text-lg leading-10'>
                    Subtotal : ${cart && cart.reduce((acc, val) => acc + val.product_price, 0)}
                </p>
                <button className='w-full rounded-md bg-amber-300 hover:bg-amber-400 text-white p-3'>Checkout</button>
            </div>
        </div>
    )
}

export default UserCart;