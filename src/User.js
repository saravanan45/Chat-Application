import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { auth } from './Firebase';
import { db } from './Firebase';

function User(props) {
  const { receiverName, senderId, receiverId } = props.match.params;
  const [message, setMessage] = useState([]);
  const [chat, setChat] = useState('');

  const msgRef = useRef(message);

  useEffect(() => {
    getChats();
  }, []);

  // useEffect(() => {
  //   compareMessages();
  // }, [message]);

  const getChats = async () => {
    try {
      db.ref('chats').on('value', snapshot => {
        let msg = [];
        let filtered = [];
        snapshot.forEach(snap => {
          msg.push(snap.val());
        });
        filtered = msg.filter(m => m.from === senderId || m.to === senderId);
        const reversed = filtered.reverse();
        compareMessages(reversed);
        msgRef.current = reversed;
        setMessage(reversed);
        localStorage.setItem('chats', JSON.stringify(reversed));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const compareMessages = newChats => {
    console.log(msgRef);
    const filteredChats = newChats.filter(
      chat => !msgRef.current.some(tempChat => tempChat.message == chat.message)
    );
    console.log(filteredChats);
    let msg = [];
    if (filteredChats.length) {
      msg = filteredChats.map(chat => {
        if (chat.to == senderId) {
          return chat.message;
        }
      });
      console.log('msg', msg[0]);
    }
    Notification.requestPermission()
      .then(permission => {
        if (permission == 'granted') {
          if (msg.length && msg[0] !== undefined) {
            var notification = new Notification('New message', {
              body: msg[0]
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const submitMessage = async event => {
    event.preventDefault();
    try {
      const msg = {
        message: chat,
        timeStamp: Date.now(),
        from: senderId,
        to: receiverId
      };
      await db.ref('chats').push(msg);
      setChat('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="User-page">
      <div className="header-field">
        <span className="header-span">{receiverName}</span>
      </div>
      <Message message={message} userId={senderId} />
      <form onSubmit={e => submitMessage(e)}>
        <div className="user-footer">
          <input
            className="message-input-field"
            type="text"
            name="message-area"
            placeholder="Type your message here!"
            value={chat}
            autoComplete="off"
            onChange={e => setChat(e.target.value)}
          />
          <button
            className="message-button"
            type="submit"
            onClick={e => submitMessage(e)}
          >
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default User;
