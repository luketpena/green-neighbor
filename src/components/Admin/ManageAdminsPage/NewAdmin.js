import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const Body = styled.form`
    h1 {
        font-family: var(--font-header);
        font-size: 64px;
        margin: 0;
    }
    h2 {
        margin: 0;
        font-family: var(--font-main);
        font-weight: lighter;
      }
    label {
        color: #f1773b;
    }
    height: max-content;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    color: white;
    text-shadow: 0 0 4px black;
`;

export default function NewAdmin() {

    const {usernames} = useParams();
    const dispatch = useDispatch(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const addNewAdmin = () => {
        dispatch({ type: 'POST_NEW_ADMIN', payload: {username, password} });
        dispatch({ type: 'GET_ADMIN_USERS', usernames});
    }

    return(
      <Body onSubmit={addNewAdmin}>
        <h1>Add New Admin</h1>
          <form className="form">               
            <label htmlFor="name">New Name</label>
              <input 
                  type="text" 
                  placeholder="Username" 
                  id="name" 
                  value={username} 
                  onChange={e=>setUsername(e.target.value)} 
                  tabIndex="1">
              </input>                          
              <label htmlFor="password">Password</label>
              <input 
                  type="text" 
                  placeholder="Password" 
                  id="password" 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)} 
                  tabIndex="2">   
              </input>                                  
            <button >Submit</button>                   
          </form>
      </Body>  
    );
}
