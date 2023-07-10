import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { sendFormData } from './PostData';
import { AuthContext } from './Context/authContext';
import { useNavigate } from 'react-router-dom';

const UserAuth = () => {
    const { setForm } = useContext(AuthContext);
    const [successAuth, setSuccessAuth] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);

    const [isRegister, setIsRegister] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();


    function handleChange(e) {
        e.preventDefault();
        setErrorAuth(false);
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
                console.log(error);
                setErrorAuth(true);
            }
            else {
                if(isRegister && response.status === 200){
                    setIsRegister(false);
                }
                else if (!isRegister && response.status === 200) {
                    setSuccessAuth(true);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setTimeout(() => {
                        setForm();
                    }, 1500);
                    navigate(0);
                }
                else{
                    setErrorAuth(true);
                }
            }
        })
    }

    return (
        <div className="fixed h-fit w-1/2 top-[0] left-[25%] right-[25%] my-20 p-10 z-[2] bg-slate-100">
            <form className=" max-w-xl p-0" autoComplete="off" onSubmit={handleSubmit}>
                <div className='text-3xl form-header flex item-center justify-between mb-5'>
                    <span>Sign {isRegister ? 'Up' : 'In'}</span>
                    {
                        successAuth && 
                        <div className='text-sm py-3'>
                            <i className="fa-solid fa-circle-check text-[#12d943] mr-2"></i>
                            <span>{isRegister ? 'Registered Successfully' : 'Logged in successfully'}</span>
                        </div>
                    }

                    {
                        errorAuth && 
                        <div className='text-sm py-3'>
                            <i className="fa-solid fa-circle-xmark text-[#f60404] mr-2"></i>
                            <span>Please check email or password!</span>
                        </div>
                    }

                    <span className='cursor-pointer text-4xl' onClick={() => setForm()}>&#9747;</span>
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

                <div className='form-footer font-[Inter] text-blue-500 hover:text-blue-800 cursor-pointer' 
                onClick={(e) => {
                    e.preventDefault();
                    setIsRegister(prevValue => !prevValue)
                }}>
                    {isRegister ? 'Already have an account? Sign in' : "Don't have account? Sign up"}
                </div>
            </form>
        </div>
    )
}

export default UserAuth