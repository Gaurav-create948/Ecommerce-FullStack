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
          <Navbar />
          <div>
            <Outlet/>
          </div>
        </div>
      // </QueryClientProvider>
    )
  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
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