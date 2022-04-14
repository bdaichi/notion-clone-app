import type { NextPage } from 'next'
import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import fetchUser from '../service/user_service';
import axios from 'axios';

const Home: NextPage = () => {
  const baseURL = 'http://localhost:3001/post_api';
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;",
      "Access-Control-Allow-Origin": "*",
  },
  }

  const [data, setData] = useState('')

  const postData = async () => {
   
    await axios.post('http://localhost:3001/post_api', {
      patams: {
        text: 'あああ',
      },
    })
    .then((results) => {
      console.log('results', results.data.msg);
  })
    .catch((err) => {
      console.log("エラーの内容です。");
      const errorId = err.config.data.id
      console.log(err);
      console.log(errorId)
    });
  }

  useEffect(() => {
    // fetchUser(setData)
    
  }, [])
  
  return (
    <>
      <div>
        <Button
          onClick={postData}
        >
          押す
        </Button>
        </div>
    </>
  );
}

export default Home
