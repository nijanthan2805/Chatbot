import { useState } from "react"; //"react" is considered as a module and we are import the specific "useState" from react(module) from node_modules(package)
import { ChatInput } from "./components/ChatInput"; //Named Export
import ChatMessages from "./components/ChatMessages"; //Default Export
import "./App.css";

function App() {

  //State - When we update this data it will upate the html with the help of State 
  const [chatMessages, setChatMessages] = useState([{ //Array Deconstructing
    message : "hello chatbot",
    sender : "user",
    id : "id1"
  }, {
    message : "Hello! How can I help you?",
    sender : "robot",
    id : "id2" 
  }, {
    message : "whats the date today",
    sender : "user",
    id : "id3" 
  }, {
    message : "Today is October 7",
    sender :"robot",
    id : "id4"
  }]);
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
