import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import '../src/styles/mainPage.css';
import mainPhoto from './images/mainPhoto.jpg';
import YouTube from './images/youtube.jpeg';
import Navbar from './navbar';
import Post from './images/post.png';
import Dictionary from './images/dictionary.jpg';
import ToDo from './images/todolist.jpg';
import { Link } from 'react-router-dom';
const MainPage= () => {
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');
    
    if (!uid || !token) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div>
    <Navbar/>
    <div className="photo-text-cards-container">
      <div className="photo-container">
        <img
          src={mainPhoto}
          alt="Sample"
          className="photo"
        />
        <p className="photo-text">Infuse your daily routine with a burst of insipiration to propel you with academic journey</p>
      </div>
      
      <div className="cards-container">
        <div className="card">
        <Link to="/youtube" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={YouTube}
          alt="Card 1"
          className="card-image"
        />
        <h3>Youtube</h3>
        <p>Search Youtube and select your desired video to play it</p>
      </Link>
        </div>
        <div className="card">
        <Link to="/post" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            src={Post}
            alt="Card 2"
            className="card-image"
          />
          <h3>Post Community</h3>
          <p>Share your Achivements and thoughts here .</p>
        </Link>
        </div>
        <div className="card">
        <Link to="/dictionary" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            src={Dictionary}
            alt="Card 3"
            className="card-image"
          />
          <h3>Dictionary</h3>
          <p>Search for meanings and keywords </p>
        </Link>
        </div>
        <div className="card">
        <Link to="/todo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            src={ToDo}
            alt="Card 4"
            className="card-image"
          />
          <h3>To do</h3>
          <p>Add your to do list for the day and remove them as you finish</p>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MainPage;
