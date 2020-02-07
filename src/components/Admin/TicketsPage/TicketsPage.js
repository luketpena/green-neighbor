import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {TextField, Table, TableHead, TableBody,
        TableCell, TableRow, makeStyles, Checkbox,
        FormGroup, FormLabel, FormControl, FormControlLabel
    } from '@material-ui/core';
import {useLocation, useHistory} from 'react-router-dom';
import writeQueries from '../../../modules/writeQueries';
import parseQueries from '../../../modules/parseQueries';

import TicketsList from './TicketsList';

const Page = styled.div`
    margin: 80px 16px 0px 16px;
`;

const SearchButton = styled.button`
    max-width: 8rem;
`;

const Form = styled.form`
    display: grid;
    grid-template-areas:
        'a b'
        'c .';
`;

const useStyles = makeStyles({
    table: {
        overflow: 'scroll',
        maxHeight: '100vh'
    },
    inputField: {
        margin: '8px'
    }
})

export default function TicketsPage() {
    const history = useHistory();
    const {search} = useLocation();
    const classes = useStyles();
    const {
        zip, program, utility, resolved,
        fromCompanies, fromUtility, fromProgram, offset, comments
    } = parseQueries(search);
    const [zipSearch, setZipSearch] = useState(zip || '');
    const [utilitySearch, setUtilitySearch] = useState(utility || '');
    const [programSearch, setProgramSearch] = useState(program || '');
    const [showResolved, setShowResolved] = useState(!!resolved || false);
    const [showFromCompanies, setShowFromCompanies] = useState(!!fromCompanies || !(fromUtility || fromProgram));
    const [showFromUtility, setShowFromUtility] = useState(!!fromUtility|| !(fromCompanies || fromProgram));
    const [showFromProgram, setShowFromProgram] = useState(!!fromProgram || !(fromCompanies || fromUtility));
    const [commentSearch, setCommentSearch] = useState(comments || '');
    const dispatch = useCallback(useDispatch(), []);
    const ticketCount = useSelector(state=>state.tickets.count);
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
            <h2>Filters:</h2> 
            <Form onSubmit={onSearch} className={classes.form}>
                <FormGroup aria-label="search bars" row>
                    <TextField
                        className={classes.inputField}
                        label='Zip Code'
                        value={zipSearch}
                        type='number'
                        onChange={e => setZipSearch(e.target.value)}
                    />
                    <TextField
                        className={classes.inputField}
                        label='Utility'
                        value={utilitySearch}
                        onChange={e => setUtilitySearch(e.target.value)}
                    />
                    <TextField
                        className={classes.inputField}
                        label='Program'
                        value={programSearch}
                        onChange={e => setProgramSearch(e.target.value)}
                    />
                    <TextField
                        className={classes.inputField}
                        label='Comment Text'
                        value={commentSearch}
                        onChange={e => setCommentSearch(e.target.value)}
                    />
                </FormGroup>
                <FormGroup aria-label='filters' row>
                    <FormControlLabel
                        value={showFromCompanies}
                        label='Missing Companies'
                        control={
                            <Checkbox
                                checked={fromCompanies}
                                onChange={()=>setShowFromCompanies(!showFromCompanies)}
                                color='default'
                            />
                        }
                    />
                    <FormControlLabel
                        value={showFromUtility}
                        label='Missing Programs'
                        control={
                            <Checkbox
                                checked={showFromUtility}
                                onChange={()=>setShowFromUtility(!showFromUtility)}
                                color='default'
                            />
                        }
                    />
                    <FormControlLabel
                        value={fromProgram}
                        label='Errors in Program'
                        control={
                            <Checkbox
                                checked={fromUtility}
                                onChange={()=>setShowFromProgram(!fromProgram)}
                                color='default'
                            />
                        }
                    />
                    <FormControlLabel
                        value={showResolved}
                        label='Show Resolved'
                        control={
                            <Checkbox
                                checked={showResolved}
                                onChange={()=>setShowFromUtility(!setShowResolved)}
                                color='default'
                            />
                        }
                    />
                </FormGroup>
                <SearchButton
                    className={classes.inputField}
                    type='submit'
                    role='submit'
                    className='button-default'
                >
                    Search
                </SearchButton>
            </Form>
            <Table className={classes.table}>
                <TableHead>
                   <TableRow>
                        <TableCell>Zip</TableCell>
                        <TableCell>Utility</TableCell>
                        <TableCell>Program</TableCell>
                        <TableCell>Resolved</TableCell>
                    </TableRow> 
                </TableHead>
                <TableBody>
                    <TicketsList />
                </TableBody>
            </Table>
        </Page>
    )
}