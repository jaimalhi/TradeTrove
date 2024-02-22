import React, { useState } from 'react';
import axios from 'axios';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../LoginPage/firebase";
import './SignupPage.css';
import { useNavigate } from 'react-router';
function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    age: '',
    gender: '',
    isTradesperson: false

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    console.log(formData);
    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            axios.put(`/login`,{
               title:"Authenticated",
               body: {token:user.getIdToken(),user:user}
            })
            navigate("/landingTemp");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert("Something went wrong!")
        });
  };

  return (
    <div className='signup_container'>
      <h2>SignUp Page</h2>
      <form className='signup_form' onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>

        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </label>

        <label>
          Are you a tradesperson?
          <input
            type="checkbox"
            name="isTradesperson"
            checked={formData.isTradesperson}
            onChange={handleChange}
          />
        </label>


        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
