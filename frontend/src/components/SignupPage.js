import React, { useState } from 'react';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isContractor: 'no',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-very-light-green">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <h2 className="text-center text-dark-green mb-6">Sign Up</h2>
        <p className="text-medium-green mb-4">Please fill in this form to create an account!</p>

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mb-4 px-3 py-2 rounded shadow w-full"
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mb-4 px-3 py-2 rounded shadow w-full"
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mb-4 px-3 py-2 rounded shadow w-full"
        />

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="mb-4 px-3 py-2 rounded shadow w-full"
        />

        <div className="flex justify-around mb-4">
        <span className="mb-2 block text-lg">Are you a contractor?</span> 
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="isContractor"
              value="yes"
              checked={formData.isContractor === 'yes'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="isContractor"
              value="no"
              checked={formData.isContractor === 'no'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>

        <button type="submit" className="w-full bg-dark-green text-white py-2 rounded hover:bg-medium-green">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
