import React from 'react';
import '../src/styles/mainPage.css'
import mainPhoto from './images/mainPhoto.jpg';
import YouTube from './images/youtube.jpeg'
import Post from './images/post.png'
const MainPage= () => {
  return (
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
          <img
            src={YouTube}
            alt="Card 1"
            className="card-image"
          />
          <h3>YOUTUBE</h3>
          <p>Search Youtube and select your desired video to play it</p>
        </div>
        <div className="card">
          <img
            src={Post}
            alt="Card 2"
            className="card-image"
          />
          <h3>Post Community</h3>
          <p>Share your Achivements and thoughts here .</p>
        </div>
        <div className="card">
          <img
            src="https://via.placeholder.com/150"
            alt="Card 3"
            className="card-image"
          />
          <h3>Card 3</h3>
          <p>Description for card 3.</p>
        </div>
        <div className="card">
          <img
            src="https://via.placeholder.com/150"
            alt="Card 4"
            className="card-image"
          />
          <h3>Card 4</h3>
          <p>Description for card 4.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
