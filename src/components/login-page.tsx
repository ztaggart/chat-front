import { useState } from "react";
import * as userService from "../services/user-service";
import { UserData} from "../hooks/use-userdata";

const LoginPage = ({
  setUserData,
}: {
  setUserData: (userData: UserData) => void;
}) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function logIn() {
    try {
      const resp = await userService.logIn(username, password);
      console.log(resp);
      let user = resp.data.username;
      let jwt = resp.data.jwt;
      let userId = resp.data.userId;
      setShowError(false);
      setUserData({ username: user, jwt, userId});
    } catch (e) {
      setShowError(true);
      setErrorMessage("The entered username or password does not exist.");
      console.log("username or password does not exist");
    }
  }
  async function register() {
    try {
      const resp = await userService.register(username, password);
      console.log(resp);
      setShowError(false);
    } catch (e) {
      setShowError(true);
      setErrorMessage("Registering failed. That username is already in use.");
    }
  }
  return (
    <div className="h-screen flex align-middle justify-center">
      <div className="flex flex-col w-1/2 m-auto">
        {showError && (
          <div className="text-red-500 flex justify-center">{errorMessage}</div>
        )}
        Username
        <input
          className="border-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        Password
        <input
          className="border-2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-2 border-2" onClick={logIn}>
          Log in
        </button>
        <button className="mt-2 border-2" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
