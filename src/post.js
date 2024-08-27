import React, { useState, useRef } from 'react';
import NewsFeed from './display-posts';
import Navbar from './navbar';
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
        const uid = localStorage.getItem('uid');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('uid', uid);  // Pass the user ID

        if (fileInputRef.current.files[0]) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        try {
            const response = await fetch('http://localhost:4000/create-post', {
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

    // Inline styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f4f4f4',
    };

    const formStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        width: '100%',
        maxWidth: '600px',
        boxSizing: 'border-box',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '16px',
        marginBottom: '10px',
        outline: 'none',
    };

    const textareaStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '16px',
        marginBottom: '10px',
        outline: 'none',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        marginTop: '10px',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    return (
        <>
        <Navbar/>
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h3 style={{ margin: '0 0 10px 0' }}>Enter Title</h3>
                <input 
                    type="text" 
                    value={title} 
                    onChange={handleTitleChange} 
                    placeholder="Enter title here..." 
                    style={inputStyle} 
                />

                <h3 style={{ margin: '20px 0 10px 0' }}>Enter Description</h3>
                <textarea 
                    value={description} 
                    onChange={handleDescriptionChange} 
                    placeholder="Enter description here..." 
                    style={textareaStyle} 
                />

                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    style={{ marginBottom: '15px' }} 
                />

                <button 
                    type="submit" 
                    style={buttonStyle} 
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Create Post
                </button>
            </form>
            <NewsFeed />
        </div>
        </>
    );
}

export default Post;
