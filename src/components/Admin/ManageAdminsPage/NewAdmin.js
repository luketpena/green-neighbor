import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    h1 {
        text-align: center; 
    }
    width: 50%;
    display: block;
    justify-content: center;
    background-color: var(--color-bkg-container);
    border-radius: 16px;
    padding: 16px;
    box-sizing: border-box;
    box-shadow: 0 4px 4px -2px var(--color-shadow);
    margin: 10px 0;
    float: left
    label {
        padding: 10px;
    }
    input {
        margin: 10px 10px 10px 0px;
        width:
    }
    div {
        justify-content: center;
        align-text: center;
    }
`;

export default function NewAdmin() {

    const {usernames} = useParams();
    const dispatch = useDispatch(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const addNewAdmin = () => {
        dispatch({ type: 'POST_NEW_ADMIN', payload: {username, password} });
        dispatch({ type: 'GET_ADMIN_USERS', usernames});
    }

    // set up password conformation
    const handleConfirmPassword = () => {
        if (password !== passConfirm)  {
            alert ("Passwords don't match, please try again.");
        } else {
            addNewAdmin();
        }
    }

    return(
        
        <Container>
            <h1>Add New Admin</h1>
                <form onSubmit={handleConfirmPassword}>
                    <div>             
                        <label htmlFor="name">New Username</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Username" 
                                id="name" 
                                value={username} 
                                onChange={e=>setUsername(e.target.value)} 
                                tabIndex="1">
                            </input>     
                        </div>
                        <div>                           
                        <label htmlFor="password">Password</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Password" 
                                id="password" 
                                value={password} 
                                onChange={e=>setPassword(e.target.value)} 
                                tabIndex="2">   
                            </input> 
                        </div>    
                        <div> 
                        <label htmlFor="confirm-password"> Confirm Password</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Confirm Password" 
                                id="password" 
                                value={passConfirm} 
                                onChange={e=>setPassConfirm(e.target.value)} 
                                tabIndex="2">   
                            </input> 
                        </div>
                        <div>                                              
                            <button >Submit</button>
                        </div>                     
                </form>
        </Container>
    )
}
