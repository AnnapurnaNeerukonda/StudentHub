import React, { useState, useRef } from 'react';

function Post() {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null); // Create a ref for the file input

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleReset = () => {
        setDescription('');
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input field
        }
    };

    const handleSave = () => {
        // Logic to save the description and image to the database
        console.log('Description:', description);
        console.log('Image:', image);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                width: '350px', 
                height: '300px', // Reduced height
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <div>
                    <h3>Enter Description</h3>
                    <textarea 
                        value={description} 
                        onChange={handleDescriptionChange} 
                        placeholder="Enter description here..." 
                        style={{ width: '100%', height: '80px', marginBottom: '10px' }} // Adjusted height for textarea
                    />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        ref={fileInputRef} // Attach the ref to the file input
                        style={{ marginBottom: '10px' }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent:'right' }}>
                    <button onClick={handleReset} style={{ padding: '8px 16px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
                        Reset
                    </button>
                    <button onClick={handleSave} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;
