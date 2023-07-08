import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { sendFormData } from './PostData';
import { AuthContext } from './Context/authContext';

const UserAuth = () => {
    const{ setForm } = useContext(AuthContext);

    const [isRegister, setIsRegister] = useState(true);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });


    function handleChange(e) {
        const { name, value } = e.target;
        if (isRegister) {
            setRegisterForm({ ...registerForm, [name]: value });
        }
        else {
            setLoginForm({ ...loginForm, [name]: value });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        sendFormData(isRegister, (!isRegister ? loginForm : registerForm), (!isRegister ? setLoginForm : setRegisterForm), (error, response) => {
            if (error) {
                console.error(error);
            }
            else {
                if (response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    alert('User successfully logged in!');
                    setForm();
                }
            }
        })
    }

    return (
        <div className="fixed h-fit w-1/2 top-[0] left-[25%] right-[25%] my-20 p-10 z-[2] bg-slate-100">
            <form className=" max-w-xl p-0" autoComplete="off" onSubmit={handleSubmit}>
                <div className='text-3xl form-header flex mb-5'>
                    <span>Sign {isRegister ? 'Up' : 'In'}</span>
                    <span className='cursor-pointer text-4xl ml-auto' onClick={() => setForm()}>&#9747;</span>
                </div>
                <div className={isRegister ? 'block' : 'hidden'}>
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={registerForm.username}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={isRegister ? registerForm.email : loginForm.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={isRegister ? registerForm.password : loginForm.password}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className='my-10'>
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                </div>

                <div className='form-footer font-[Inter] text-blue-500 hover:text-blue-800 cursor-pointer' onClick={() => setIsRegister(prevValue => !prevValue)}>
                    {isRegister ? 'Already have an account? Sign in' : "Don't have account? Sign up"}
                </div>
            </form>
        </div>
    )
}

export default UserAuth