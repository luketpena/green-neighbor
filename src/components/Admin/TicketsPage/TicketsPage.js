import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useLocation, useHistory} from 'react-router-dom';
import writeQueries from '../../../modules/writeQueries';
import parseQueries from '../../../modules/parseQueries';
import {Container, ManageBox, SearchBox, FilterBox,
        FilterOption, MainBox, MainHeader, MainTable,
        PageButton, PageBar
    } from '../AdminUI';

import TicketsList from './TicketsList';

export default function TicketsPage() {
    const history = useHistory();
    const {search} = useLocation();
    const {
        zip, program, utility, resolved,
        fromCompanies, fromUtility, fromProgram, offset, comments
    } = parseQueries(search);
    console.log(parseQueries(search));
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
        <Container>
            <h2>Tickets Management</h2>
            <ManageBox>
                <SearchBox onSubmit={onSearch} aria-label="search box">
                    <form>
                        <input
                            placeholder='Zip Code'
                            value={zipSearch}
                            type='number'
                            onChange={e => setZipSearch(e.target.value)}
                        />
                        <input
                            placeholder='Utility'
                            value={utilitySearch}
                            onChange={e => setUtilitySearch(e.target.value)}
                        />
                        <input
                            placeholder='Program'
                            value={programSearch}
                            onChange={e => setProgramSearch(e.target.value)}
                        />
                        <input
                            placeholder='Comment Text'
                            value={commentSearch}
                            onChange={e => setCommentSearch(e.target.value)}
                        />
                        <button
                            type='submit'
                            role='submit'
                            className='button-default'
                        >Search</button>
                    </form>
                </SearchBox>
                <FilterBox>
                    <FilterOption>
                        <input
                            type="checkbox"
                            checked={showFromCompanies}
                            onChange={()=>setShowFromCompanies(!showFromCompanies)}
                        />
                        <label>Missing Companies</label>
                    </FilterOption>
                    <FilterOption>
                        <input
                            type="checkbox"
                            checked={showFromUtility}
                            onChange={()=>setShowFromUtility(!showFromUtility)}
                        />
                        <label>Missing Programs</label>
                    </FilterOption>
                    <FilterOption>
                        <input
                            type="checkbox"
                            checked={showFromProgram}
                            onChange={()=>setShowFromProgram(!showFromProgram)}
                        />
                        <label>Program Errors</label>
                    </FilterOption>
                    <FilterOption>
                        <input
                            type="checkbox"
                            checked={showResolved}
                            onChange={()=>setShowResolved(!showResolved)}
                        />
                        <label>Show Resolved</label>
                    </FilterOption>
                </FilterBox>
                <MainBox>
                    <MainTable>
                        <thead>
                            <tr style={{position: 'sticky'}}>
                                <th>Zip</th>
                                <th>Company</th>
                                <th>Program</th>
                                <th>Resolved</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TicketsList />
                        </tbody>
                    </MainTable>
                </MainBox>
            </ManageBox>
        </Container>
    )
}