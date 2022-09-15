import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/context/AuthContext';

const initialFormData={
  email:'',
  password:''
}

function LoginPage() {
  const [formData,setFormData]=useState(initialFormData)

  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()
  const {userLoggedIn} = useAuth()
  const isBtnDisabled = Object.keys(formData).every(key=>(
    formData[key] && formData[key].trim() !== ""
  ))

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const apiData = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials:'include'
      })
      const response = await apiData.json()
      
      if(response.status){
        userLoggedIn()
        setTimeout(() => {
          // setShowLoader(false)
          setFormData(initialFormData)
          
        }, 500);
        setTimeout(() => {
          navigate('/')
        }, 600);
      }
      else {
        window.alert(response.message)
      }
    }
    catch (err) {
      window.alert(err.message)
    }
  }
  useEffect(()=>{
    if(isAuthenticated) navigate("/")
  },[isAuthenticated, navigate])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <form onSubmit={handleLogin} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e)=>{
                if(e.target.value && e.target.value.trim() !== ""){
                  setFormData({
                    ...formData,
                    email:e.target.value
                  })
                }
                else {
                  setFormData({
                    ...formData,
                    email:""
                  })
                }
              }}
              id="email"
              placeholder="Enter your email"
              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete='on'
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e)=>{
                if(e.target.value && e.target.value.trim() !== ""){
                  setFormData({
                    ...formData,
                    password:e.target.value
                  })
                }
                else {
                  setFormData({
                    ...formData,
                    password:""
                  })
                }
              }}
              id="password"
              placeholder="Enter your password"
              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete='on'
            />
          </div>
       
          <button
          disabled={!isBtnDisabled}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
