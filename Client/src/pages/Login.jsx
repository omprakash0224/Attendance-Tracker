import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const { storetokeninLS } = useAuth();

    // let handle the input field value
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log("login form", response);
            const res_data = await response.json();
            if (response.ok){
                // alert("Login successful");
                storetokeninLS(res_data.token);
                localStorage.setItem('userId', res_data.userId);
                localStorage.setItem('username', res_data.username);
                localStorage.setItem('studentId', res_data.studentId);
                setUser({email: "", password: "",});
                toast.success("Login Successful");
                navigate("/");
              }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("Invalid credentials");
              }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex justify-center item-center bg-gradient-to-r from-cyan-200 via-sky-400 to-sky-200 h-[100vh] w-[100vw]'>
            <div className='loginform w-full md:w-1/2 mx-4 mt-12 md:mx-20 md:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] md:bg-white rounded-xl'>
                <h1 className="main-heading mb-3 font-bold text-3xl md:text-5xl m-4">Login</h1>
                <br />
                <form className='' onSubmit={handleSubmit}>
                    <div>
                        <label className='font-medium text-xl md:text-3xl ml-6' htmlFor="email">email</label>
                        <br />
                        <input className=' w-3/4 md:w-3/4 p-4 m-3 border border-gray-400 rounded-lg'
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleInput}
                            placeholder="email"
                        />
                    </div>
                    <div>
                        <label className='font-medium text-xl md:text-3xl ml-6' htmlFor="password">password</label>
                        <br />
                        <input className=' w-3/4 md:w-3/4 p-4 m-3 border border-gray-400 rounded-lg'
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInput}
                            placeholder="password"
                        />
                    </div>
                    <br />
                    {/* <button type="submit" className="btn btn-submit w-3/4 md:w-auto border border-blue-400 p-4 bg-blue-600 font-semibold text-lg rounded-lg text-white hover:bg-blue-500">
            Login Now
          </button> */}
                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl p-4 text-center m-3">Login Now</button>
                </form>
            </div>
        </div>
    )
}

export default Login
