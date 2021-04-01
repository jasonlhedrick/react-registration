import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const serverLoc = 'http://localhost:4000'

function register(username, password, email) {
  axios.post(`${serverLoc}/user`, 
  {'username': username, 'password': password, 'email': email})
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  });
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <main className="App">
      <form onSubmit={(e) => {
        e.preventDefault();
        register(username, password, email)}
        }>
        <input type="text" name="username" 
        onChange={e => setUsername(e.target.value)}></input>
        <input type="password" name="password" 
        onChange={e => setPassword(e.target.value)}></input>
        <input type="email" name="email" 
        onChange={e => setEmail(e.target.value)}></input>
        <button type="submit">Register</button>
      </form>
    </main>
  );
}


export default App;
