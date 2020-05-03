import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { db } from './Firebase';
import { auth } from './Firebase';
import Dropdown from 'react-bootstrap';

function Home({ history }) {
  const [Users, setUser] = useState([]);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getCurrentUserId();
    getUser();
  }, []);

  const getCurrentUserId = () => {
    const userDetails =
      JSON.parse(localStorage.getItem('userDetails')) || auth().currentUser;
    if (userDetails) {
      const { email, uid } = userDetails;
      if (email) {
        setEmail(email);
      }
      if (uid) {
        setUserId(uid);
        updateStatus(uid, 'online');
      }
      if (userDetails) {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
      }
    }
  };

  const updateStatus = (userId, status) => {
    const ref = db
      .ref('Users')
      .orderByChild('userId')
      .equalTo(userId);
    ref.once('value').then(function(snapshot) {
      snapshot.forEach(child => {
        child.ref.update({ status }).then(() => console.log('success'));
      });
      return true;
    });
  };

  const getUser = () => {
    db.ref('Users').on('value', snapshot => {
      let users = [];
      snapshot.forEach(snap => {
        users.push(snap.val());
      });
      return setUser(users);
    });
  };

  const filterUsers = () => {
    const filteredUsers = Users.filter(user => user.userId !== userId);
    console.log('filteredUsers', filteredUsers);
    return filteredUsers;
  };

  const openUser = user => {
    history.push(`/user/${userId}/${user.userId}/${user.userName}`);
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        updateStatus(userId, 'offline');
        localStorage.clear();
        history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="home">
      <div className="header-field">
        <span className="header-span">Chat Application</span>
        <div className="dropdown">
          {/* <button className="settings-btn">
            <i class="fa fa-cog"></i>
          </button> */}
          <button className="settings-btn" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
      <div className="home-body">
        {filterUsers().map((user, index) => (
          <div className="user-field" onClick={() => openUser(user)}>
            <li key={index}>
              {user.userName}{' '}
              <span className={`indicator-${user.status}`}>
                <span className={`indicator-icon-${user.status}`}></span>
                {user.status}
              </span>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(Home);
