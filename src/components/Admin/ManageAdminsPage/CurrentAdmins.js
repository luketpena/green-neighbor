import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';



export default function CurrentAdmin() {
    const dispatch = useDispatch(); 
    const adminUsers = useSelector(state => state.adminUsers );
    const {usernames} = useParams();
    useEffect(() =>  {
        console.log('Getting all users', usernames);
        dispatch({ type: 'GET_ADMIN_USERS' });
    }, [usernames] );

    return(
        
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                    {adminUsers.map((user,id) => {
                        return<tr>
                                <td>{user.username}</td>
                                <button>Update User Info</button>
                                <button>Remove</button>
                            </tr>})}                       
                        <td>
                            
                        </td>
                    </tr>
            
                </tbody>
            </table>
        
        
    )
}