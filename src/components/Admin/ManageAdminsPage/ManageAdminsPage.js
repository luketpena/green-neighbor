import React from 'react';
import styled from 'styled-components';
import NewAdmin from '../ManageAdminsPage/NewAdmin';
import CurrentAdmin from'../ManageAdminsPage/CurrentAdmins';

export default function ManageAdminsPage() {

  return(
    <div>
      <NewAdmin 
      />
      <CurrentAdmin 
      />
    </div>
  )
}