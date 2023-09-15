import { useState } from "react";

const LoginPage = ({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function register() {
    setLoggedIn(true);
  }
  function logIn() {
    setLoggedIn(true);
  }
  return (
    <div className="h-screen flex align-middle justify-center">
      <div className="flex flex-col w-1/2 m-auto">
        Username
        <input className="border-2" />
        Password
        <input className="border-2" type="password" />
        <button className="mt-2 border-2" onClick={register}>
          Log in
        </button>
        <button className="mt-2 border-2" onClick={logIn}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
