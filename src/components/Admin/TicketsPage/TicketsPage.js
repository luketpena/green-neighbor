import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { TextField, Table, TableHead } from '@material-ui/core';
import {useLocation, useHistory} from 'react-router-dom';
import writeQueries from '../../../modules/writeQueries';
import parseQueries from '../../../modules/parseQueries';

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

export default function TicketsPage() {
    const history = useHistory();
    const {search} = useLocation();

    const {
        zip, program, utility, resolved,
        fromCompanies, fromUtility, fromProgram, offset, comments
    } = parseQueries(search);
    const [zipSearch, setZipSearch] = useState(zip || '');
    const [utilitySearch, setUtilitySearch] = useState(utility || '');
    const [programSearch, setProgramSearch] = useState(program || '');
    const [showResolved, setShowResolved] = useState(resolved || false);
    const [showFromCompanies, setShowFromCompanies] = useState(fromCompanies || !(fromUtility || fromProgram));
    const [showFromUtility, setShowFromUtility] = useState(fromUtility || !(fromCompanies || fromProgram));
    const [showFromProgram, setShowFromProgram] = useState(fromProgram || !(fromCompanies || fromUtility));
    const [commentSearch, setCommentSearch] = useState(comments || '');
    const dispatch = useCallback(useDispatch(), []);
    const {tickets, count: ticketCount} = useSelector(state=>state.tickets);
    const pageCount = ticketCount/100;

    useEffect(()=>{
        dispatch({
            type: 'GET_TICKETS',
            payload: {
                zip, resolved, program_name: program,
                utility_name: utility, offset, comments
            }
        });
    }, [dispatch, zip, program, utility, resolved,
        fromCompanies, fromUtility, fromProgram,
        offset, comments
    ]);

    const onSearch = e => {
        e.preventDefault();
        history.push(`/admin/tickets${writeQueries({
            zip: zipSearch, program: programSearch, utility: utilitySearch,
            resolved: showResolved, fromCompanies: showFromCompanies,
            fromUtility: showFromUtility, fromProgram: showFromProgram,
            comments: commentSearch
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
                <TextField
                    label='Comment Text'
                    value={commentSearch}
                    onChange={e => setCommentSearch(e.target.value)}
                />
                <button
                    type='submit'
                    role='submit'
                    className='button-default'
                >
                    Search
                </button>
            </SearchArea>
            <Table>
                <TableHead>
                    
                </TableHead>
            </Table>
        </Page>
    )
}