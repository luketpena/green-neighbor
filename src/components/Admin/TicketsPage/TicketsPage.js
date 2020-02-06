import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const Page = styled.div`
    min-height: 100vh;
    margin-top: 80px;
`;

const SearchArea = styled.div`

`;

export default function TicketsPage() {


    return(
        <Page>
            <SearchArea>
                <TextField></TextField>
            </SearchArea>
        </Page>
    )
}