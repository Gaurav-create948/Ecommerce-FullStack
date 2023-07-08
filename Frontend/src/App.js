import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from "react-query"
import Home from './Components/Home';
import ProductInfo from './Components/ProductInfo.js';
import UserCart from './Components/UserCart.js';
import Navbar from './Components/Navbar';
import axios from "axios";
import { CircularProgress } from '@mui/material';




const App = () => {

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      // <QueryClientProvider client={queryClient}>
        <div className='main'>
          <Navbar setProducts={setProducts} />
          <div>
            <Outlet/>
          </div>
        </div>
      // </QueryClientProvider>
    )
  }

  const [products, setProducts] = useState([]);


  const { isLoading : ProductsLoading, error : ProductsGetError, data : Products } = useQuery('products', async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  })


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: ProductsLoading ? 
                    <CircularProgress color='inherit' className='mx-auto'/> 
                    : 
                    <Home products={Products} setProducts={setProducts}/>
        },
        {
          path: '/product/:_id',
          element: <ProductInfo />
        },
        {
          path: '/cart',
          element: <UserCart />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App