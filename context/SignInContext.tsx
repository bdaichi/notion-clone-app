import { FC, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchUser } from "../service/user_service";
import User from "../entity/User";

type SignInContextProps = {
  currentUser: User | null;
  reloadCurrentUserData: () => Promise<void>;
};

const SignInContext = createContext<SignInContextProps>({
  currentUser: null,
  reloadCurrentUserData: () => {
    throw new Error("Disabled reloadCurrentUserData() on SignInContext");
  },
});

const SignInProvider: FC = ({ children }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(User.initUser);
  const [password, setPassword] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  async function reloadCurrentUserData() {
    setUserId(localStorage.getItem("userId"));
    setPassword(localStorage.getItem("password"));
    if (currentUser != null && userId && password) {
      fetchUser(setCurrentUser, userId, password);
      console.log("SignInContext reloadCurrentUserData ! !");
    } else {
      console.log("SignInContext reloadCurrentUserData null");
    }
  }

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setPassword(localStorage.getItem("password"));
    if (userId && password) {
      try {
        console.log(userId, password);
        fetchUser(setCurrentUser, userId, password);
        router.push("/pages");
      } catch (e) {
        console.log("context error", e);
      }
    }
  }, [userId, password]);

  return (
    <SignInContext.Provider
      value={{
        currentUser: currentUser,
        reloadCurrentUserData: reloadCurrentUserData,
      }}
    >
      {/* initUserの場合はloading */}
      {currentUser == null ||
      (currentUser != null && currentUser.userId != "init") ? (
        children
      ) : (
        <div className="flex justify-center py-80">
          <CircularProgress color="primary" />
        </div>
      )}
    </SignInContext.Provider>
  );
};

export { SignInContext, SignInProvider };
