import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  h1 {
    text-align: center;
  }
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
        <Container>
            <h1>Add New Admin</h1>
                <form onSubmit={addNewAdmin}>               
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
        </Container>
    )
}