import { Dispatch, SetStateAction } from "react";
import User from "../entity/User";
import axios from "axios";
import { baseURL, createOriginallyPage } from "./page_service";

export async function createUser(user: User) {
  //postでuserのjsonを渡す
  try {
    await axios.post(`${baseURL}/create_user`, {
      user: user.toJson(),
    });
  } catch (e) {
    console.log("createuser error", e);
  }
  createOriginallyPage(user.userId);
}

export async function fetchUser(
  setCurrentUser: Dispatch<SetStateAction<User | null>>,
  userId: string,
  signInPassword: string
) {
  axios
    .post(`${baseURL}/read_user`, {
      userId: userId,
      signInPassword: signInPassword,
    })
    .then((results) => {
      console.log(results.data.user);
      setCurrentUser(User.fromJSON(results.data.user[0]));
    })
    .catch((error) => {
      console.log("通信失敗");
      console.log(error.status);
    });
}
