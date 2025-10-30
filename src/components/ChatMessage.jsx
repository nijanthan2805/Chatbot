import RobotProfileImage from "../assets/robot.png"; //Default export
import UserProfileImage from "../assets/user.png";
import "./ChatMessage.css";

//Props - Children(text) & Attributes passed to the component, below props - message, sender
export function ChatMessage({message, sender}){ //Destructed using shortcuts
  // const message = props.message;
  // const sender = props.sender;
  // const {message, sender} =props;
  
  /*
  if(sender === "robot"){
    return (
      <div>
        <img src="robot.png" width="50" />
        {message}
      </div>
    );
  }
  */

  return (
    //We used div here to fit the component vertically in the browser 
    <div className={
      sender === "user"
      ? "chat-message-user"
      : "chat-message-robot"
    }>
      {sender === "robot" && (
        <img src={RobotProfileImage} 
          className = "chat-message-profile"/>
      )}
      <div className = "chat-message-text">
        {message}
      </div>
      {sender === "user" && (
        <img src={UserProfileImage}
          className = "chat-message-profile"/>
      )}
    </div>
  );
  // return (
  //   <div>
  //     {message}
  //     <img src={`${msgfrom}.png`} width="50" />
  //   </div>
  // );
}