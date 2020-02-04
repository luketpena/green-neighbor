import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

export default function ReportErrorPage(props){

    const {zip, company, program} = useParams();

    return(
    <Container>
        {JSON.stringify([zip, company, program])}
    </Container>
    )
}