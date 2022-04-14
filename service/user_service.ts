import { Dispatch, SetStateAction } from "react";
import User from "../entity/User";
import axios from 'axios';

export default function fetchUser(setData: Dispatch<SetStateAction<string>>) {
  axios
  .get('http://localhost:3001/read_api')
  .then((results) => {
      console.log(results.data.user);
      setData(results.data.user)
  })
  .catch((error) => {
      console.log('通信失敗');
      console.log(error.status);
  });
}