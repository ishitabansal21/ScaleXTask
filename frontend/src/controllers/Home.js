import React, { useState, useEffect } from 'react';
import "./Home.css"

const Home=()=>{
    const [pairs, setPairs] = useState([]);

    useEffect(() => {
      const fetchPairs = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/'); // Change URL as needed
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setPairs(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchPairs();
    }, []);

    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:8000/api/${id}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Failed to delete item');
          }
          // Remove the deleted item from the state
          setPairs(pairs.filter(pair => pair._id !== id));
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };

    return (
        <div>
      <h1 className="heading">Token Pairs</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Price Native</th>
            <th>Price USD</th>
            <th>Price Change (Last 24 Hours)</th>
            <th>Volume (Last 24 Hours)</th>
            <th>Action</th> {/* Added Action column for delete button */}
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair, index) => (
            <tr key={index}>
              <td>{pair.priceNative}</td>
              <td>{pair.priceUsd}</td>
              <td>{`${pair.priceChange.h24}%`}</td>
              <td>{pair.volume.h24}</td>
              <td>
                <button onClick={() => handleDelete(pair._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    );
}
export default Home;