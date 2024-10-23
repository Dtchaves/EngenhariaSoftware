import React from 'react';
import axios from 'axios';

function HomePage() {
    const [message, setMessage] = React.useState('');

    const handleButtonClick = () => {
        axios.get('http://127.0.0.1:5000/api/data')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setMessage('Error fetching data');
            });
    };

    return (
        <div>
            <h2>Home Page</h2>
            <button onClick={handleButtonClick}>Get Message from Flask</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default HomePage;
