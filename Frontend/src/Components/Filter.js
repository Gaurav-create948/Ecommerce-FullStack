import React, { useEffect, useState } from 'react'

const Filter = ({showFilters, setShowFilters, setProducts}) => {
    const [event, setEvent] = useState();
    const [categories, setCategories] = useState({
        mensClothing: {
            isClicked: false,
            category: "men's clothing"
        },
        jewelery: {
            isClicked: false,
            category: "jewelery"
        },
        electronics: {
            isClicked: false,
            category: "electronics"
        },
        womensClothing: {
            isClicked: false,
            category: "women's clothing"
        },
    });

    function handleChange(event) {
        const { name } = event.target;

        const products = JSON.parse(localStorage.getItem('allProducts'));
        const filteredData = products.filter(product => product.category === name);
        setProducts(filteredData);
    }
    
    function handleClick(e) {
        if(showFilters){
            setShowFilters(false);
        }
        else{
            setShowFilters(true);
        }

        const style = 'rotate-45';
        const filterBtn = e.target;
        console.log(filterBtn(1));
    }

    return (
        <div>
            <div className='filter-btn w-5' onClick={handleClick}>
                <div className='btn bg-black h-1 my-1 w-inherit'></div>
                <div className='btn bg-black h-1 my-1 w-inherit'></div>
            </div>
            <span>Filters</span>

            <table className={`flex flex-wrap w-60 ${showFilters ? 'block' : 'hidden'} p-10 border border-solid border-slate-300 rounded-md`}>
                <tr>
                    <th>
                        Category
                    </th>
                </tr>

                <tr>
                    <td>
                        <input
                            type='checkbox'
                            value={categories.mensClothing}
                            name="men's clothing"
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <label>men's clothing</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            type='checkbox'
                            value={categories.electronics}
                            name="electronics"
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <label>electronics</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            type='checkbox'
                            value={categories.jewelery}
                            name="jewelery"
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <label>jewelery</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            type='checkbox'
                            value={categories.womensClothing}
                            name="women's clothing"
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <label>women's clothing</label>
                    </td>
                </tr>
            </table>

        </div>
    )
}

export default Filter