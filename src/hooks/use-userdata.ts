import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const USERNAME = "USERNAME";
export const JWT = "JWT";
export const USERID = "USERID";

export interface UserData {
  username: string;
  jwt: string;
  userId: number;
}

export function useUserData(): [
  UserData,
  (data: UserData) => void,
  () => void
] {
  const [username, setUsername] = useState<string>("");
  const [jwt, setJwt] = useState<string>("");
  const [userId, setUserId] = useState<number>(-1);

  useEffect(() => {
    let storedUsername = localStorage.getItem(USERNAME);
    let storedJwt = localStorage.getItem(JWT);
    let storedId = Number(localStorage.getItem(USERID));
    if (storedJwt && storedUsername && storedId) {
      let decodedJwt = jwtDecode(storedJwt);
      // token is not expired
      if (decodedJwt.exp! < new Date().getTime() * 1000) {
        setUsername(storedUsername);
        setJwt(storedJwt);
        setUserId(storedId);
      }
    }
  }, []);

  function setUserData(userData: UserData) {
    setUsername(userData.username);
    localStorage.setItem(USERNAME, userData.username);
    setJwt(userData.jwt);
    localStorage.setItem(JWT, userData.jwt);
  }

  function logOut() {
    setUsername("");
    localStorage.removeItem(USERNAME);
    setJwt("");
    localStorage.removeItem(JWT);
  }

  return [{ username, jwt, userId }, setUserData, logOut];
}
