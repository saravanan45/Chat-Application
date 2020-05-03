import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from './Images/manicon.jpg';
import { withRouter } from 'react-router-dom';
import { auth, db } from './Firebase';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // const getCurrentUserId = () => {
  //   const uid = auth().currentUser.uid;
  //   if (uid) {
  //     setUserId(uid);
  //     db.ref('Users')
  //       .child(`${email}`)
  //       .update({});
  //   }
  // };

  const submitForm = async () => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          const details = { email, password };
          localStorage.setItem('loginDetails', JSON.stringify(details));
          return history.push('/home');
        });
    } catch (error) {
      setError(true);
      return history.push('/');
    }
  };

  return (
    <div className="bg-image">
      <div className="login-form">
        <div className="profile">
          <img src={img}></img>
        </div>
        {error ? (
          <span className="error-msg">Invalid Email/Password</span>
        ) : null}
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
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="button-field"
          type="submit"
          onClick={() => submitForm()}
        >
          Login!
        </button>
        <span className="login-span">
          Don't have an account, create one! <Link to="/signUp">Register</Link>
        </span>
      </div>
    </div>
  );
}

export default withRouter(Login);
