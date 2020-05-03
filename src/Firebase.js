import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA3EdFHq15HQkQ4sMkQ6my-oILhVUYj8tw',
  authDomain: 'chat-a9a0c.firebaseapp.com',
  databaseURL: 'https://chat-a9a0c.firebaseio.com',
  projectId: 'chat-a9a0c',
  storageBucket: 'chat-a9a0c.appspot.com',
  messagingSenderId: '233834599438',
  appId: '1:233834599438:web:73c7b673421824f276d85f',
  measurementId: 'G-EBDCB3PTTE'
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
