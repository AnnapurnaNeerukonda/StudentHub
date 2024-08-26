import React, { useState, useRef } from 'react';
import NewsFeed from './display-posts';
function Post() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const fileInputRef = useRef(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const uid = localStorage.getItem('uid')
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('uid', uid);  // Pass the user ID
    
        if (fileInputRef.current.files[0]) {
            formData.append('image', fileInputRef.current.files[0]);
        }
    
        try {
            const response = await fetch('http://localhost:4001/create-post', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result.message);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    return ( 
        <>
       
        <form onSubmit={handleSubmit}>
            <h3>Enter Title</h3>
            <input 
                type="text" 
                value={title} 
                onChange={handleTitleChange} 
                placeholder="Enter title here..." 
                style={{ width: '100%', height: '40px', marginBottom: '10px' }} 
            />

            <h3>Enter Description</h3>
            <textarea 
                value={description} 
                onChange={handleDescriptionChange} 
                placeholder="Enter description here..." 
                style={{ width: '100%', height: '80px', marginBottom: '10px' }} 
            />

            <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                style={{ marginBottom: '10px' }}
            />

            <button type="submit">Create Post</button>
        </form>
        <NewsFeed/>
        </>
    );
}

export default Post;
