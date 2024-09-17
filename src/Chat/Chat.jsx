import React, { useRef, useEffect, useState } from 'react';
import './Chat.css';

const ChatComponent = ({ chats }) => {
  const chatContainerRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const scrollToBottom = () => {
    if (!isUserScrolling && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = chatContainerRef.current;
      if (container) {
        setIsUserScrolling(container.scrollTop + container.clientHeight < container.scrollHeight);
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

  
    scrollToBottom();


    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chats, isUserScrolling]);

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
