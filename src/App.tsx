import { createContext, useState } from "react";
import "./App.css";
import ConversationContainer from "./components/conversation-container";
import SidebarContainer from "./components/sidebar-container";
import LoginPage from "./components/login-page";
import { UserData, useUserData } from "./hooks/use-userdata";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { Conversation } from "./types/message";

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
  const [activeConversation, setActiveConversation] = useState<
    Conversation | undefined
  >();

  return !userData.username ? (
    <LoginPage setUserData={setUserData} />
  ) : (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="w-full h-screen flex">
          <SidebarContainer
            logOut={logOut}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          ></SidebarContainer>
          <ConversationContainer
            activeConversation={activeConversation}
          ></ConversationContainer>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
