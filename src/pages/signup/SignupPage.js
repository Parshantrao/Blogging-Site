import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialFormData = {
  title: '',
  first_name: '',
  last_name: '',
  email: '',
  password: ''
}

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,19})/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function SignupPage() {
  const [formData, setFormData] = useState(initialFormData)
  const [showLoader,setShowLoader] = useState(false)

  const navigate = useNavigate()

  let isBtnDisabled = Object.keys(formData).every(key => (
    formData[key] && formData[key].trim() !== ""
  ))

  const emailCheck = (e) => {
    const emailElement = document.getElementById('email')
    const emailValue = emailElement.value
    if(!emailRegex.test(emailValue) ){
      emailElement.setCustomValidity("Invalid email.")
    }
    else {
      emailElement.setCustomValidity("")
    }
    setFormData({ ...formData, email: e.target.value })
  }

  const passwordCheck = (e) => {
    const passwordElement = document.getElementById('password')
    const passwordValue = passwordElement.value
    if(!passwordRegex.test(passwordValue) ){
      passwordElement.setCustomValidity("Password must be at least 8 characters long and include uppercase, lowercase, and numeric characters.")
    }
    else {
      passwordElement.setCustomValidity("")
    }
    setFormData({ ...formData, password: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setShowLoader(true)
    try {
      const apiData = await fetch('http://localhost:3001/authors', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials:'include'
      })
      const response = await apiData.json()
      if(response.status){
        setTimeout(() => {
          setShowLoader(false)
          setFormData(initialFormData)
          
        }, 500);
        setTimeout(() => {
          navigate('/login')
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Sign-up</h1>
        <form onSubmit={handleSignup} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4 flex space-x-4">
            <div className=" w-4/12">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <select
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
              </select>
            </div>
            <div className=" w-8/12">
              <label
                htmlFor="first_name"
                className="block text-gray-700 font-semibold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                placeholder="Enter your first name"
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="on"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              placeholder="Enter your last name"
              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="on"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={emailCheck}
              placeholder="Enter your email"
              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="on"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={passwordCheck}
              placeholder="Enter your password"
              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="on"
            />
          </div>

          <button
            type="submit"
            disabled={!isBtnDisabled}
            className={`w-full py-2 px-4 rounded-lg text-white font-bold transition duration-300 ${isBtnDisabled
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            Signup
            {/* {true && (
              <div className="ml-3">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                  <path className="opacity-75" fill="currentColor" d="M1 12a8 8 0 018-8v8H4z"></path>
                </svg>
              </div>
            )} */}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
