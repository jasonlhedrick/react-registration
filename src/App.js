import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const serverLoc = 'http://localhost:4000'

function register(username, password, email) {
  const registerButton = document.querySelector("#registerButton");
  registerButton.disabled = true;
  registerButton.style.cursor = 'wait';
  axios.post(`${serverLoc}/user`, 
  {'username': username, 'password': password, 'email': email})
  .then(res => {
    console.log(res.data);
    registerButton.disabled = false;
    registerButton.style.cursor = 'auto';
  })
  .catch(err => {
    if (err.response) console.log(err.response.data);
    registerButton.disabled = false;
    registerButton.style.cursor = 'auto';
  });
  
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <main className="App">
      <form className="registrationForm" onSubmit={(e) => {
        e.preventDefault();
        register(username, password, email)}
        }>
          <fieldset>
            <legend>Register an account</legend>
            <label for="username">Username</label>
            <input type="text" name="username" 
            onChange={e => setUsername(e.target.value)}></input>
            <label for="password">Password</label>
            <input type="password" name="password" 
            onChange={e => setPassword(e.target.value)}></input>
            <label for="email">Email</label>
            <input type="email" name="email" 
            onChange={e => setEmail(e.target.value)}></input>
            <button id="registerButton" type="submit">Register</button>
        </fieldset>
      </form>
    </main>
  );
}


export default App;
