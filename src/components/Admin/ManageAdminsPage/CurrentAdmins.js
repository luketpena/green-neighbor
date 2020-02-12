import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import UpdateAdminInfo from '../ManageAdminsPage/UpdateAdminInfo';
// import styled from 'styled-components';





export default function CurrentAdmin() {
    const dispatch = useDispatch(); 
    const adminUsers = useSelector(state => state.adminUsers );
    const {usernames} = useParams();
    const [open, setOpen] = useState(false);
    // const [close, setClose] = useState(true);

    const editButton  = () => {
        console.log('hitting edit button');
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        };

    useEffect(() =>  {
        console.log('Getting all users', usernames);
        dispatch({ type: 'GET_ADMIN_USERS' });
    }, [usernames] );

    // Function to Delete Users --- Admins cannot update other admin's info.
    // Delete only shows for logged in admins

    const deleteAdmin = (id) => {
        console.log('start deleteAdmin');
        dispatch({ type: 'DELETE_ADMIN', payload: id});
    };

    

    

    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                    
                    {adminUsers.map((user, i) => {
                        return<tr key={i}>
                            {/* {JSON.stringify(user)} */}
                                <td>{user.username}</td>
                                <td>
                                    <button onClick={() => editButton()}>Update User Info</button>
                                </td>
                                <td> 
                                    <button onClick={() => deleteAdmin(user.id)} >Remove</button>
                                </td>   
                            </tr>})}
                </tbody>
            </table>
        
            <UpdateAdminInfo open={open} close={handleClose} />
        </div>
    )
}