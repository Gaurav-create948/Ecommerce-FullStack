import React from 'react'
import { Link } from "react-router-dom";

const Main = ({ products }) => {
  return (
    <div className='main flex flex-wrap'>
      {
        products.map(product =>
          <Link className='basis-1/4 border border-slate-300 rounded-lg mx-10 my-10 p-10 hover:border-slate-500 transition delay-150 duration-300 ease-in-out' to={`/product/${product.id}`}>
            <div>
              <img className='w-3/5 hover:w-full hover:transition delay-150 duration-700 ease-in-out h-full block mx-auto' src={product.image} alt='product-image' />
            </div>
            <div className='product-info text-center text-lg'>
              <p>{product.title}</p>
              <p>Price : ${product.price}</p>
            </div>
          </Link>
        )
      }
    </div>
  )
}

export default Main