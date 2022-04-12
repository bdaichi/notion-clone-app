import { Dispatch, SetStateAction } from "react";
import User from "../entity/User";
import axios from 'axios';

export default async function fetchUser(setData: Dispatch<SetStateAction<string>>) {
  await axios
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