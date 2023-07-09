import React, { useState, useEffect, useContext } from 'react'
import Navbar from './Navbar'
import Filter from './Filter'
import Main from './Main'
import UserAuth from './UserAuth'
import Overlay from './Overlay'
import { AuthContext } from './Context/authContext'


const Home = () => {
    const [showFilters, setShowFilters] = useState(false);
    const{showForm} = useContext(AuthContext);

    return (
        <div className='container mx-auto'>
            {showForm && <Overlay/>}
            {/* <Filter showFilters={showFilters} products = {props.products} setShowFilters={setShowFilters} setProducts={props.setProducts} /> */}
            <Main />
            {showForm && <UserAuth />}
        </div>
    )
}

export default Home