import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await axios.post(`${import.meta.env.VITE_APP_API_URL}addUser/`, JSON.stringify({ username, email, password }), { headers: { 'Content-Type': 'application/json' }, validateStatus: (status: any) => status >= 200 });

            if(user.status === 200) {
                Cookies.set('user', JSON.stringify(user.data), { expires: 5 }); // Le cookie expirera après 5 jours
                navigate('/');
            }
            else if(user.status === 500) {
                throw Error('An error occured while signing up');
            }
            
        } catch (error: Error | any) {
            console.log(error);
            setError(error.message);
        }
    };

    return (
        <>
            {error !== '' && <p className='text-red-500 text-center p-4 rounded-lg border-red-500 bg-red-200 border w-9/12 lg:w-1/4 mt-16 mx-auto'>{error}</p>}
            <form className='flex flex-col justify-around w-9/12 lg:w-1/4 mx-auto mt-28 bg-white rounded-lg p-5' onSubmit={handleSubmit}>
                <h1 className='font-bold text-2xl text-center'>Sign Up</h1>
                <div className='flex flex-col my-3'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='Username'
                        className='border border-black rounded-lg p-2'
                    />
                </div>
                <div className='flex flex-col my-3'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className='border border-black rounded-lg p-2'
                    />
                </div>
                <div className='flex flex-col my-3'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        className='border border-black rounded-lg p-2'
                    />
                </div>
                <button type="submit" className="text-white mx-2 bg-black p-2 rounded-lg my-3">Submit</button>
                <a href='/login' className='no-underline cursor-pointer hover:text-blue-950 my-3'>Already have an account? Login!</a>
            </form>
        </>
    );
};

export default SignUp;