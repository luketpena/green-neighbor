import React, {useState} from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import {useLocation, useHistory} from 'react-router-dom';

const Page = styled.div`
    min-height: 1000vh;
    margin: 80px 16px 0px 16px;
    display: grid;
    grid-template-columns: 1fr 3fr;
`;

const SearchArea = styled.form`
    display: flex;
    flex-flow: column nowrap;
`;

const textFieldStyle = {

}

const parseQueries = str => {
    const queries = (str[0] === '?' ? str.substring(1) : str).split('&');
    return queries.reduce((acc, query) => {
        query = query.split('=');
        acc[query[0]] = (query[1] || true);
        return acc;
    }, {});
}

const writeQueries = obj => {
    return `?${Object.entries(obj)
        .filter(([key, value]) => value)
        .map(([key, value])=>`${key}=${value}`)
        .join('&')}`;
}

export default function TicketsPage() {
    const history = useHistory();
    const {search} = useLocation();
    const {
        zip, program, utility, resolved,
        fromCompanies, fromUtility, fromProgram, offset
    } = parseQueries(search);
    const [zipSearch, setZipSearch] = useState(zip || '');
    const [utilitySearch, setUtilitySearch] = useState(utility || '');
    const [programSearch, setProgramSearch] = useState(program || '');
    const [showResolved, setShowResolved] = useState(resolved || false);
    const [showFromCompanies, setShowFromCompanies] = useState(fromCompanies || !(fromUtility || fromProgram));
    const [showFromUtility, setShowFromUtility] = useState(fromUtility || !(fromCompanies || fromProgram));
    const [showFromProgram, setShowFromProgram] = useState(fromProgram || !(fromCompanies || fromUtility));

    const onSearch = e => {
        e.preventDefault();
        history.push(`/admin/tickets${writeQueries({
            zip: zipSearch, program: programSearch, utility: utilitySearch,
            resolved: showResolved, fromCompanies: showFromCompanies,
            fromUtility: showFromUtility, fromProgram: showFromProgram
        })}`);
    }

    return(
        <Page>
            <SearchArea onSubmit={onSearch}>
                <h2>Filters:</h2> 
                <TextField
                    label='Zip Code'
                    value={zipSearch}
                    type='number'
                    onChange={e => setZipSearch(e.target.value)}
                />
                <TextField
                    label='Utility'
                    value={utilitySearch}
                    onChange={e => setUtilitySearch(e.target.value)}
                />
                <TextField
                    label='Program'
                    value={programSearch}
                    onChange={e => setProgramSearch(e.target.value)}
                />
                <button
                    type='submit'
                    role='submit'
                    className='button-default'
                >
                    Search
                </button>
            </SearchArea>
        </Page>
    )
}