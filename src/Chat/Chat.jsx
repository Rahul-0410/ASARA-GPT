import React, { useRef, useEffect, useState } from 'react';
import './Chat.css';

const ChatComponent = ({ chats }) => {
  const chatContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight + 2; // Ensures the last chat is visible
    }
  };

  useEffect(() => {
    // Trigger scroll if the container height changes
    const newHeight = chatContainerRef.current?.scrollHeight || 0;
    if (newHeight > containerHeight) {
      setContainerHeight(newHeight);
      scrollToBottom();
    }
  }, [chats, containerHeight]);

  return (
    <div className="chat-container" ref={chatContainerRef} >
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
      <div style={{ float: 'left', clear: 'both' }} />
    </div>
  );
};

export default ChatComponent;
