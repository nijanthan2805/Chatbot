import { useState } from "react"; //"react" is considered as a module and we are import the specific "useState" from react(module) from node_modules(package)
import { ChatInput } from "./components/ChatInput"; //Named Export
import ChatMessages from "./components/ChatMessages"; //Default Export
import "./App.css";

function App() {

  //State - When we update this data it will upate the html with the help of State 
  const [chatMessages, setChatMessages] = useState([]);
  // const chatMessages = array[0]; //Current Data
  // const setChatMessages =array[1]; //Updater Function

  //Generating HTML components using JS using Arrays and ArrayFunction - map() \ If we craete in variable it will not upate the HTML instead we use state
  return (
    <div className="app-container">
      <ChatMessages 
        chatMessages = {chatMessages}
      />
      <ChatInput 
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
      />
    </div>
  );

} 

export default App
