import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/Posts.css'; // Make sure you import the CSS file for styling
const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const uid = localStorage.getItem("uid");

      if (!uid) {
        console.error("UID not found in local storage");
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/get-newsfeed", {
          params: { uid },
        });

        if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
        } else {
          console.error("Expected an array but got:", typeof response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again later.");
      }
    };

    fetchPosts();
  }, []);

  const handleLikeDislike = async (postId) => {
    try {
      const uid = localStorage.getItem("uid");
  
      if (!uid) {
        console.error("UID not found in local storage");
        return;
      }
  
      const post = posts.find((p) => p.id === postId);
      const isLiked = post.likedBy && post.likedBy.includes(uid); 
      const endpoint = isLiked
        ? "http://localhost:4000/dislike-post"
        : "http://localhost:4000/like-post";
  
      const response = await axios.post(endpoint, { postId, uid });
  
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
                  likedBy: isLiked
                    ? post.likedBy.filter((user) => user !== uid)
                    : [...(post.likedBy || []), uid], 
                }
              : post
          )
        );
      } else {
        console.error(`Failed  post:`, response.data);
      }
    } catch (error) {
      console.error(`Error post:`, error.message);
      if (error.response) {
        console.error("Server responded with:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };
  

  const formatDate = (seconds, nanoseconds) => {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return date.toLocaleString();
  }
  const uid = localStorage.getItem("uid");
    return (
      <div className="posts-container">
        {error && <p className="error-message">{error}</p>}
        {posts.map((post) => {
          const isLiked = post.likedBy && post.likedBy.includes(uid); // Check if likedBy is defined
  
          return (
            <div key={post.id} className="post-card">
              <div className="post-header">
                {post.userDetails.profilePic && (
                  <img src={post.userDetails.profilePic} alt="Profile" className="profile-pic" />
                )}
                <div className="user-info">
                  <p className="username">{post.userDetails.username}</p>
                </div>
              </div>
              {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
              <button className="like-button" onClick={() => handleLikeDislike(post.id)}>
                {isLiked ? "Dislike" : "Like"}
              </button> <span className="post-likes">{post.likesCount}</span>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">{post.description}</p>
              <p className="post-date">{formatDate(post.date._seconds, post.date._nanoseconds)}</p>

            </div>
          );
        })}
      </div>
    );
  }
export default NewsFeed;
