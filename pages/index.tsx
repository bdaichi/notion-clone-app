import type { NextPage } from 'next'
import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import fetchUser from '../service/user_service';
import axios from 'axios';

const Home: NextPage = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    fetchUser(setData)
  }, [])
  
  return (
    <>
      <div className="App">
        {data}
      </div>
    </>
  );
}

export default Home
