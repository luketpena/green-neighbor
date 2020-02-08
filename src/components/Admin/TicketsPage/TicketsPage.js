import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import writeQueries from '../../../modules/writeQueries';
import parseQueries from '../../../modules/parseQueries';
import {Container, ManageBox, SearchBox, FilterBox,
        FilterOption, MainBox, MainHeader, MainTable,
        PageButton, PageBar, MainTableHead, MainTableCell,
        MainTableRow
    } from '../AdminUI';

import TicketsList from './TicketsList';

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
    const [showResolved, setShowResolved] = useState(resolved);
    const [showFromCompanies, setShowFromCompanies] = useState(!!fromCompanies || !(fromUtility || fromProgram));
    const [showFromUtility, setShowFromUtility] = useState(!!fromUtility|| !(fromCompanies || fromProgram));
    const [showFromProgram, setShowFromProgram] = useState(!!fromProgram || !(fromCompanies || fromUtility));
    const [commentSearch, setCommentSearch] = useState(comments || '');
    const dispatch = useCallback(useDispatch(), []);
    const ticketCount = useSelector(state=>state.tickets.count);

    const clickPage = (page) => {
        const current = parseQueries(search);
        current.offset = page * 100;
        history.push(`/admin/tickets${writeQueries(current)}`)
    }

    const renderPages = () => {
        const pageList = [];
        const pageMax = Math.ceil(ticketCount / 100);
        if(pageMax <= 1) return null;

        const page = (offset / 100) || 0;
        const pageButton = (index, goto, text) => {
            return <PageButton
                        key={index}
                        index={index}
                        page={page}
                        onClick = {() => clickPage(goto)}
                    >{text}</PageButton>
        }
        if(page > 5){
            pageList.push(pageButton(-1, 0, '<<'));
        }

        if(page >= pageMax - 5) {
            for(let i = Math.max(pageMax - 10, 0); i < pageMax; i++){
                pageList.push(pageButton(i, i, i+1))
            }
        } else {
            const min = Math.max(page - 4, 0);
            for(let i = min; i < min + 10; i++){
                pageList.push(pageButton(i, i, i+1));
            }
        }

        if(page < pageMax - 6){
            pageList.push(pageButton(pageMax, pageMax - 1, '>>'));
        }

        return pageList;
    }

    useEffect(()=>{
        dispatch({
            type: 'GET_TICKETS',
            payload: {
                zip, resolved, program_name: program,
                utility_name: utility, offset, comments,
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
                    <form onSubmit={onSearch}>
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
                        <select
                            value={showResolved}
                            onChange={e=>{
                                setShowResolved(e.target.value !== '' ? e.target.value : undefined)
                            }}
                        >
                            <option value=''>Show All</option>
                            <option value={true}>Show Resolved</option>
                            <option value={false}>Show Unresolved</option>
                        </select>
                    </FilterOption>
                </FilterBox>
                <MainBox>
                    <MainHeader>
                        <p>Page {offset/100 + 1 || 1} of {Math.ceil(ticketCount / 100) || 1}</p>
                        <PageBar>{renderPages()}</PageBar>
                    </MainHeader>
                    <MainTable>
                        <MainTableHead>
                            <MainTableRow>
                                <th>Zip</th>
                                <th>Company</th>
                                <th>Program</th>
                                <th>Resolved</th>
                            </MainTableRow>
                        </MainTableHead>
                        <TicketsList />
                    </MainTable>
                </MainBox>
            </ManageBox>
        </Container>
    )
}