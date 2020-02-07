import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    color: white;
    height: 100vh;
    width: max-content;
    margin: auto auto;
    align-text: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

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
    const history = useHistory();
    const dispatch = useDispatch(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() =>  {
        console.log('Getting all users', usernames);
        dispatch({ type: 'GET_ADMIN_USERS' });
    }, [] );

    const adminUsers = useSelector(state => state.adminUsers );

    const addNewAdmin = () => {
        dispatch({ type: 'POST_NEW_ADMIN', payload: {username, password} });
        dispatch({ type: 'GET_ADMIN_USERS'});
    }


    return(
      <Container>
          {JSON.stringify(adminUsers)}
          <Body>
            <h1>Add New Admin</h1>
            
                <label htmlFor="name">New Name</label>
                <input 
                    type="text" 
                    placeholder="Username" 
                    id="name" 
                    value={username} 
                    onChange={e=>setUsername(e.target.value)} 
                    tabIndex="1"></input>
                <label htmlFor="password">Password</label>
                <input 
                    type="text" 
                    placeholder="Password" 
                    id="password" 
                    value={password} 
                    onChange={e=>setPassword(e.target.value)} 
                    tabIndex="2"></input>
                <button>Submit</button>
            
          </Body>
          
      </Container>
    )
}