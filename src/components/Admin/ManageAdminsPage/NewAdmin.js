import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: block;
    justify-content: center;
    background-color: var(--color-bkg-container);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 4px 4px -2px var(--color-shadow);
    margin: 50px 25px;
    label {
        display: inline-block;
        width:100px;
        text-align: left;
    }
    input {
        margin: 10px 10px 10px 0px;
    }
    button {
        display:  block;
        margin: 25px auto ;
    }
    h1 {
        text-align: center; 
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
    }

    // set up password conformation
    const handleConfirmPassword = e => {
        e.preventDefault();
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
                                type="password" 
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
                                type="password" 
                                placeholder="Confirm Password" 
                                id="confirm-password" 
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
