import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Register.css';

function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', gender: '', tel: '' });
  
  const navigate = useNavigate();

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4001/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem('uid', data.userData.uid);
        localStorage.setItem('token', data.userData.token); 
        navigate('/main');
      } else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4001/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setIsLogin(true);
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  return (
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
                    name="email"
                    placeholder="Enter email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    autoComplete="off"
                    aria-label="email"
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
                    aria-label="Password"
                  />
                </div>
                <button type="submit" className="btn">Login</button>
                <p>Not a member yet? <Link to="#" onClick={() => setIsLogin(false)}>Sign Up</Link></p>
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
                    aria-label="Username"
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
                    aria-label="Email"
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
                    aria-label="Password"
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-control"
                    name="gender"
                    value={signupData.gender}
                    onChange={handleSignupChange}
                    required
                    aria-label="Gender"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                 <button type="submit" className="btn">Sign Up</button>
                <p>Already have an account? <Link to="#" onClick={() => setIsLogin(true)}>Login</Link></p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
