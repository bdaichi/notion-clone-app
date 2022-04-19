import { Dispatch, SetStateAction } from "react";
import User from "../entity/User";
import axios from 'axios';

export async function createUser(user: User) {
    //postでuserのjsonを渡す
}

export async function fetchUser(setCurrentUser: Dispatch<SetStateAction<User | null>>, userId: string, signInPassword: string) {
  axios
  .get('http://localhost:3001/read_user')
  .then((results) => {
      console.log(results.data.user);
      setCurrentUser(User.fromJSON(results.data.user[0]))
  })
  .catch((error) => {
      console.log('通信失敗');
      console.log(error.status);
  });

}