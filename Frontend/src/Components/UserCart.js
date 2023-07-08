import React, { useState, useEffect, useContext } from 'react';
import { useQuery, QueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { AuthContext } from './Context/authContext';
// import {checkUser, getCookie} from './CheckValidUser';

const UserCart = () => {
    const { currentUser } = useContext(AuthContext);
    const [deleteItem, setDeleteItem] = useState(false);

    const queryClient = new QueryClient();

    const { isLoading: CartLoading, error: CartLoadingError, data: CartData } = useQuery('cart', async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/cart', { withCredentials: true });
            return data;
        } catch (error) {
            console.log(error);
        }
    })

    const mutation = useMutation(
        async (data) => {
            try {
                return !data.user_ref_id ? await axios.patch('http://localhost:5000/cart', {data}) : axios.patch('http://localhost:5000/cart/deleteCartItem', {data});
            } catch (error) {
                console.log(error);
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('cart');
            }
        }
    );

    function updateQuantity(data, e) {
        const btn = e.target.closest('.btn').textContent;
        let newQuantity;
        if (btn === '+') {
            // Increase the quantity and price
            newQuantity = data.product_quantity + 1;
            mutation.mutate({ newQuantity, user_id: data.user_ref_id, product_id: data.product_id });
        }
        else {
            // Decrease the quantity and price
            newQuantity = data.product_quantity - 1;
            mutation.mutate({ newQuantity, user_id: data.user_ref_id, product_id: data.product_id });
        }
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
                    CartLoadingError ? 'Can\'t load the cart'
                        :
                        CartLoading ? 'Loading...'
                            :
                            CartData.map(data =>
                                <div key={data.product_id} className='cart-data flex justify-around'>
                                    <div className='w-[35%] flex justify-around gap-2'>
                                        <img className='w-[150px]' src={data.product_image} alt='product-image' />
                                        <span className='flex m-auto'>{data.product_title}</span>
                                    </div>
                                    <div className='flex gap-5 m-auto'>
                                        <div className='flex py-3 px-3 gap-3 border border-solid border-slate-500' onClick={(e) => updateQuantity(data, e)}>
                                            <button className='btn bg-slate-300 px-2'>+</button>
                                            <span className='price'>{data.product_quantity}</span>
                                            <button className='btn bg-slate-300 px-2'>-</button>
                                        </div>
                                        <i
                                            className="fa-regular fa-trash-can text-slate-500 m-auto"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                mutation.mutate(data);
                                            }}>
                                        </i>

                                    </div>
                                    <div className='flex border border-solid m-auto'>
                                        <p>${data.product_quantity * data.product_price}</p>
                                    </div>
                                </div>
                            )
                }
            </div>

            <div className='right h-fit bg-slate-50 py-20 px-10'>
                <p className='text-lg leading-10'>
                    Subtotal ${CartData && CartData.reduce((acc, val) => acc + val.product_price, 0)}
                </p>
                <p className='text-sm leading-10'>Taxes and shipping calculated at checkout</p>
                <button className='w-full rounded-md bg-amber-300 hover:bg-amber-400 text-white p-3'>Checkout</button>
            </div>
        </div>
    )
}

export default UserCart;