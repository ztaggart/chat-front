import { useState } from "react";
import "./App.css";
import ConversationContainer from "./components/conversation-container";
import SidebarContainer from "./components/sidebar-container";
import LoginPage from "./components/login-page";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(loggedIn);
  if (!loggedIn) {
    return <LoginPage setLoggedIn={setLoggedIn}></LoginPage>;
  }

  return (
    <div className="grid grid-cols-12 h-screen">
      <SidebarContainer></SidebarContainer>
      <ConversationContainer></ConversationContainer>
    </div>
  );
}

export default App;
