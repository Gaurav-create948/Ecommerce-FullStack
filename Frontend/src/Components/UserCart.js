import React, { useState, useEffect, useContext } from 'react';
import { useQuery, QueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { AuthContext } from './Context/authContext';
// import {checkUser, getCookie} from './CheckValidUser';

const UserCart = () => {
    const [usersCart, setUsersCart] = useState([]);
    const { currentUser } = useContext(AuthContext);

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
        async (count) => {
            try {
                const res = axios.patch('http://localhost:5000/cart', { count });
                console.log(res);
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

    function updateQuantity() {
        document.querySelector('.quantity')
    }

    return (
        <div className='container flex'>
            <div className='container left'>
                <table className='flex flex-col gap-10 mx-10 text-center'>
                    <tr className='flex justify-between'>
                        <th><p className='font-thin text-slate-400 text-center'>product</p></th>
                        <th><p className='font-thin text-slate-400 text-center'>quantity</p></th>
                        <th><p className='font-thin text-slate-400 text-center'>price</p></th>
                    </tr>
                    {
                        CartLoadingError ? 'Can\'t load the cart'
                            :
                            CartLoading ? 'Loading...'
                                :
                                CartData.map(data =>
                                    <tr key={data.id} className='flex item-center justify-between'>
                                        <div className='w-[33%] flex flex-row justify-around item-center'>
                                            <img className='w-[100px]' src={data.product_image} alt='product-image' />
                                            <p>{data.product_title}</p>
                                        </div>
                                        <div className='quantity w-[25%]'>
                                            <td className='flex justify-left text-center'>
                                                <button className='btn bg-slate-200 px-2' onClick={updateQuantity}>+</button>
                                                <span>{data.product_price}</span>
                                                <button className='btn bg-slate-200 px-2' onClick={updateQuantity}>-</button>
                                            </td>
                                        </div>
                                        <div className='text-center flex justify-left'>
                                            <p>{data.product_price}</p>
                                        </div>
                                    </tr>
                                )
                    }
                </table>
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