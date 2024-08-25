import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar'; 
import './styles/Register.css';

function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', gender: '', tel: '' });


  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', signupData);
  };

  return (
    <div>
      <Navbar /> 
      <div className="register-container">
        <div className="image-side">
          <img
            src="https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/KX3873/group-indian-school-students-book-with-laptop-study-e-learning-class-KX3873.jpg"
            className="image"
            alt="Students"
          />
        </div>
        <div className="form-side">
          <div className="card login-form">
            <div className="card-body">
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} autoComplete="off">
                  <div className="mb-3">
                    <span className="title">Login</span>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Enter username"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <button type="submit" className="btn">Login</button>
                  <p>Not a member yet? <a href="#" onClick={() => setIsLogin(false)}>Sign Up</a></p>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit} autoComplete="off">
                  <span className="title">Sign Up</span>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Enter username"
                      value={signupData.username}
                      onChange={handleSignupChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-control"
                      name="gender"
                      value={signupData.gender}
                      onChange={handleSignupChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      name="tel"
                      placeholder="Enter Phone number"
                      value={signupData.tel}
                      onChange={handleSignupChange}
                      minLength="10"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <button type="submit" className="btn">Sign Up</button>
                  <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login</a></p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
