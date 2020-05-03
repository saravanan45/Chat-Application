import React from 'react';
import { withRouter } from 'react-router-dom';

function Message({ message = [], userId }) {
  const humanFormatDate = timeStamp => {
    const cDate = new Date(timeStamp);
    return cDate.toLocaleTimeString();
  };
  return (
    <div className="textarea-message" name="message-body">
      {message.map(chat =>
        chat.to === userId ? (
          <div className="message-block-to">
            <p className="chat-message" key={chat.timeStamp}>
              {chat.message}
            </p>
            {humanFormatDate(chat.timeStamp)}
          </div>
        ) : (
          <div className="message-block-from">
            <p className="chat-message" key={chat.timeStamp}>
              {chat.message}
            </p>
            {humanFormatDate(chat.timeStamp)}
          </div>
        )
      )}
    </div>
  );
}
export default withRouter(Message);
