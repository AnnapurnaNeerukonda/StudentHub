import React, { useState } from 'react';
import axios from 'axios';
import '../src/styles/Youtube.css'
import Navbar from './navbar';
const YouTubeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: `${query} educational`,
          type: 'video',
          maxResults: 10,
          key: 'AIzaSyBPJiE1G4K7GDV3nViF6lpf2JniPGE0xhk',
          videoCategoryId: '27'
        }
      });
         
      const videos = response.data.items.map(item => ({
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channel: item.snippet.channelTitle,
        videoId: item.id.videoId,
        description: item.snippet.description,
        published: item.snippet.publishedAt
      }));

      setResults(videos);
    } catch (err) {
      setError('An error occurred while fetching results.');
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div id="results">
        {results.length > 0 ? (
          <div>
            {results.map((video, index) => (
              <div key={index} className="video-item">
                <h2>{video.title}</h2>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>{video.description}</p>
                <p>Published: {new Date(video.published).toLocaleDateString()}</p>
                <p>Channel: {video.channel}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default YouTubeSearch;
