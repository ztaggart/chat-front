import { createContext, useState } from "react";
import "./App.css";
import ConversationContainer from "./components/conversation-container";
import SidebarContainer from "./components/sidebar-container";
import LoginPage from "./components/login-page";
import { UserData, useUserData } from "./hooks/use-userdata";
import { over } from "stompjs";
import SockJS from "sockjs-client";

export const UserContext = createContext(
  /*<{
  userData: UserData;
  setUserData: (userData: UserData) => void;
}>*/ {
    userData: { username: "", jwt: "", userId: -1 },
    setUserData: (userData: UserData) => {},
  }
);

const SOCKET_URL = "http://localhost:8080/chat";
export const StompContext = createContext({
  stompClient: over(new SockJS(SOCKET_URL))
})

function App() {
  const [userData, setUserData, logOut] = useUserData();

  return !userData.username ? (
    <LoginPage setUserData={setUserData} />
  ) : (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="grid grid-cols-12 h-screen">
          <SidebarContainer logOut={logOut}></SidebarContainer>
          <ConversationContainer></ConversationContainer>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
