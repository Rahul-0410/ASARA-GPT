import React from 'react';
import './Chat.css';

const ChatComponent = ({ chats }) => {
  return (
    <div className="chat-container">
      {chats.map((chat, index) => (
        <React.Fragment key={index}>
          {chat.question && (
            <div className="chat-bubble chat-bubble-user">
              {chat.question}
            </div>
          )}
          {chat.airesponse && (
            <div className="chat-bubble chat-bubble-ai">
              {chat.airesponse}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChatComponent;