import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import img from './Images/manicon.jpg';
import { auth } from './Firebase';
import { db } from './Firebase';

function SignUp({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  const submitRegister = async () => {
    if (password.length !== 8) {
      setError('Password should be min 8 characters');
      return history.push('/signUp');
    }
    if (password !== cnfPassword) {
      setError('Password does not match');
      return history.push('/signUp');
    }
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => {
          const uid = data && data.user ? data.user.uid : '';
          db.ref('Users').push({
            userName,
            email,
            userId: uid,
            status: 'offline'
          });
        })
        .catch(error => {
          console.log(error);
        });

      return history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-image">
      <div className="signup-form">
        <div className="profile">
          <img src={img}></img>
        </div>
        {error ? <span className="error-msg">{error}</span> : null}
        <input
          className="input-field"
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          name="Username"
          placeholder="Username"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          name="mobile"
          placeholder="Mobile Number"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Create your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          name="confirmPassword"
          placeholder="Retype your password"
          value={cnfPassword}
          onChange={e => setCnfPassword(e.target.value)}
        />
        <button
          className="button-field"
          type="submit"
          onClick={() => submitRegister()}
        >
          Register!
        </button>
      </div>
    </div>
  );
}
export default withRouter(SignUp);
