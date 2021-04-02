import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const serverLoc = 'http://localhost:4000'


function toggleFieldset(fieldsetID) {
  const fieldset = document.querySelector(`#${fieldsetID}`);
  let cursor = 'wait';
  let opacity = '0.5';

  if (fieldset.style.cursor === 'wait') cursor = 'auto'; // Simple cursor swap
  if (fieldset.style.opacity === '0.5') opacity = '1';

  /* Actually swap the styles around */
  fieldset.style.cursor = cursor;
  fieldset.disabled = !fieldset.disabled;
  fieldset.style.opacity = opacity;

  for(let i = 0; i < fieldset.children.length; i++) {
    fieldset.children[i].disabled = !fieldset.children[i].disabled;
    fieldset.children[i].style.cursor = cursor;
    fieldset.children[i].style.opacity = opacity;
  }
}

function register(username, password, email) {
  toggleFieldset('registrationFieldset');
  axios.post(`${serverLoc}/user`, 
  {'username': username, 'password': password, 'email': email})
  .then(res => {
    console.log(res.data);
    toggleFieldset('registrationFieldset');
  })
  .catch(err => {
    if (err.response) console.log(err.response.data);
    toggleFieldset('registrationFieldset');
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
          <fieldset id="registrationFieldset">
            <legend>Register an account</legend>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" 
            onChange={e => setUsername(e.target.value)}></input>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" 
            onChange={e => setPassword(e.target.value)}></input>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" 
            onChange={e => setEmail(e.target.value)}></input>
            <button id="registerButton" type="submit">Register</button>
        </fieldset>
      </form>
    </main>
  );
}


export default App;
