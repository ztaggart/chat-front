import { createContext, useState } from "react";
import "./App.css";
import ConversationContainer from "./components/conversation-container";
import SidebarContainer from "./components/sidebar-container";
import LoginPage from "./components/login-page";
import { UserData, useUserData } from "./hooks/use-userdata";

export const UserContext = createContext(
  /*<{
  userData: UserData;
  setUserData: (userData: UserData) => void;
}>*/ {
    userData: { username: "", jwt: "", userId: -1 },
    setUserData: (userData: UserData) => {},
  }
);

function App() {
  const [userData, setUserData, logOut] = useUserData();

  return !userData.username ? (
    <LoginPage setUserData={setUserData} />
  ) : (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="grid grid-cols-12 h-screen">
          <SidebarContainer logOut={logOut}></SidebarContainer>
          <ConversationContainer /*userData={userData}*/
          ></ConversationContainer>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
