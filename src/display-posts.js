import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4001/get-newsfeed');
        setPosts(response.data.posts);  // Access the `posts` array within the response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle loading state
  if (loading) {
    return <p>Loading posts...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error loading posts: {error}</p>;
  }

  // Render posts once data is loaded and no errors
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={styles.postContainer}>
            <h3>{post.title}</h3>
            <img src={post.imageUrl} alt={post.title} style={styles.image} />
            <p>{post.description}</p>
            <p>Likes: {post.likesCount}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

const styles = {
  postContainer: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
  },
  image: {
    maxWidth: '100%',
    height: 'auto'
  }
};

export default NewsFeed;
