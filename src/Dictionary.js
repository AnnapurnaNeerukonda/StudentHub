import React, { useState } from 'react';
import axios from 'axios';
import '../src/styles/Dictionary.css'; 

const Dictionary = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        const encodedQuery = encodeURIComponent(query.trim());

        try {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodedQuery}`;
            console.log(`Request URL: ${url}`);
            const response = await axios.get(url);
            console.log('API Response:', response.data);
            const data = response.data[0];
            const phonetics = data.phonetics[0]?.text || '';
            const audio = data.phonetics[0]?.audio || '';
            const definition = data.meanings[0]?.definitions[0]?.definition || '';
            const example = data.meanings[0]?.definitions[0]?.example || '';
            const synonyms = data.meanings[0]?.definitions[0]?.synonyms || [];
            setResult({
                phonetics,
                audio,
                definition,
                example,
                synonyms
            });
        } catch (err) {
            const errorMessage = err.response
                ? (err.response.data && err.response.data.message) || 'An error occurred while fetching results.'
                : 'An error occurred.';

            console.error('API Error:', err.response ? err.response.data : err.message);
            setError(errorMessage);
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
                    placeholder="Search Dictionary..."
                    required
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {result && (
                <div>
                    <p><strong>Phonetics:</strong> {result.phonetics}</p>
                    <p><strong>Audio:</strong> <audio controls src={result.audio}>Your browser does not support the audio element.</audio></p>
                    <p><strong>Definition:</strong> {result.definition}</p>
                    <p><strong>Example:</strong> {result.example}</p>
                    <p><strong>Synonyms:</strong> {result.synonyms.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default Dictionary;
