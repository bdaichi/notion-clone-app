import type { NextPage } from 'next'
import { useState,useEffect } from 'react'

const Home: NextPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() =>{
    fetch('http://localhost:3001/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  },[])
  
  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home
