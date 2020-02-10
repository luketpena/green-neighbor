import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';



export default function CurrentAdmin() {
    const dispatch = useDispatch(); 
    const adminUsers = useSelector(state => state.adminUsers );
    const {usernames, id} = useParams();

    useEffect(() =>  {
        console.log('Getting all users', usernames);
        dispatch({ type: 'GET_ADMIN_USERS' });
    }, [usernames] );

    // Function to Delete Users --- Admins cannot update other admin's info.
    // Delete only shows for logged in admins

    const deleteAdmin = (id) => {
        console.log('start deleteAdmin');
        
        dispatch({ type: 'DELETE_ADMIN', payload: id});
    }

    return(
        
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                    
                    {adminUsers.map((user) => {
                        return<tr>
                            {JSON.stringify(user)}
                                <td>{user.username}</td>
                                <button>Update User Info</button>
                                <button onClick={() => deleteAdmin(user.id)} >Remove</button>
                            </tr>})}                       
                        <td>
                            
                        </td>
                    
            
                </tbody>
            </table>
        
        
    )
}