import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import UtilityRow from './UtilityRow';

const Container = styled.div`
  margin: 5%;
  h1 {
    text-align: center;
  }
  
`;

const ManageBox = styled.div`
  min-height: 500px;
  display: grid;
  grid-template-columns: 200px  1fr;
  grid-template-rows: 50px auto;
  grid-template-areas: "search filter" "search header" "search main";
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 8px 0 rgba(0,0,0,.5);
`;

const SearchBox = styled.div`
  background-color: var(--color-primary);
  grid-area: search;
  padding: 8px;
  box-sizing: border-box;
  input {
    display: block;
    width: 100%;
    border: none;
    outline: none;
    margin: 0 0 16px 0;
    padding: 4px;
    box-sizing: border-box;
  }
  button {
    display: block;
    margin: 0 auto;
  }
  box-shadow: 0 0 8px 0 rgba(0,0,0,.5);
  z-index: 1;
`;

const FilterBox = styled.div`
  background-color: var(--color-primary);
  grid-area: filter;
  display: flex;
  align-items: center;
`;

const FilterOption = styled.div`
  margin: 8px;
  display: flex;
  align-items: center;
  input:hover {
    cursor: pointer;
  }
`;

const MainBox = styled.div`
  grid-area: main;
  overflow-x: scroll;
`;


const MainHeader = styled.div`
  background-color: var(--color-bkg-dark);
  padding: 8px;
  box-sizing: border-box;
  
  width: 100%;
  
  .addButton  {
    display: block;
    margin: 0 auto;
  }
  p {
    text-align: center;
    color: white;
  }
`;

const MainTable = styled.table`
  
`;

const PageButton = styled.button`
  display: inline;
  font-family: var(--font-main);
  font-size: 1em;
  background: none;
  border: none;
  outline: none;
  color: ${props=>(props.page===props.index? 'white' : 'rgba(255,255,255,.6)')};
  transition: transform .2s;
  &:hover {
    cursor: pointer;
    color: white;
    transform: scale(1.2);
  }
`;

const PageBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`;


export default function RecordsPage() {

  const dispatch = useDispatch();
  const utilitiesCount = useSelector(state=>state.utilitiesCount);
  const utilitiesSearch = useSelector(state=>state.utilitiesSearch);
  const utilities = useSelector(state=>state.utilities);

  let [page, setPage] = useState(0);
  let [zip,setZip] = useState('');
  let [utility_name,setUtility_name] = useState('');
  let [program_name,setProgram_name] = useState('');
  let [state, setState] = useState('');

  let [show, setShow] = useState('all');

  let [mount, setMount] = useState(false);


  useEffect(()=>{
    dispatch({type: 'GET_UTILITIES', payload: {page, search: utilitiesSearch}});
    if (!mount) {
      setMount(true);
      dispatch({type: 'SET_UTILITIES_SEARCH', payload: {state, zip, utility_name, program_name, show}});
    }
  },[utilitiesCount, utilitiesSearch, page]);

  function renderUtilities() {
    return utilities.map( (item,i)=> {
      return <UtilityRow key={i} utility={item} page={page} search={utilitiesSearch}/>
    });
  }

  function renderPages() {
    let pageList = [];
    const pageMax = Math.ceil(utilitiesCount/100);

    function returnPageButton(index,goto,text) {
      return <PageButton key={index} index={index} page={page} onClick={()=>setPage(goto)}>{text}</PageButton>
    }

    if (page>5) {pageList.push(returnPageButton(-1,0,'<<'))}
    
    if (pageMax>9) {
      if (page<5) {
        for (let i=0; i<10; i++) {
          pageList.push(returnPageButton(i,i,i+1));
        }
      } else if (page>pageMax-6) {
        for (let i=pageMax-10; i<pageMax; i++) {
          pageList.push(returnPageButton(i,i,i+1));
        }
      } else {
        for (let i=page-4; i<page+6; i++) {
          pageList.push(returnPageButton(i,i,i+1));
        }
      } 
    } else {
      for (let i=0; i<pageMax; i++) {
        pageList.push(returnPageButton(i,i,i+1));
      }
    }

    if (page<pageMax-6) {pageList.push(returnPageButton(pageMax,pageMax-1,'>>'))}
    return pageList;
  }

  function submitSearch(event) {
    event.preventDefault();
    setPage(0);
    dispatch({type: 'SET_UTILITIES_SEARCH', payload: {state, zip, utility_name, program_name, show}});
  }

  return(
    <Container>
        <h1>Record Management</h1>
        <ManageBox>

          <SearchBox>
            <form onSubmit={submitSearch}>
              <input type="text" placeholder="State Abbreviation" onChange={event=>setState(event.target.value)} value={state} />
              <input type="number" placeholder="Zip Code" onChange={event=>setZip(event.target.value)} value={zip}/>
              <input type="text" placeholder="Utility Company" onChange={event=>setUtility_name(event.target.value)} value={utility_name}/>
              <input type="text" placeholder="Energy Program" onChange={event=>setProgram_name(event.target.value)} value={program_name}/>
              <select onChange={event=>setShow(event.target.value)}>
                <option value="all">Show all</option>
                <option value="drafts">Drafts only</option>
                <option value="active">Active only</option>
              </select>
              <button className="button-default">Search</button>
            </form>
          </SearchBox>

          <FilterBox>

          </FilterBox>

          <MainHeader>
            <p>Page {page+1} of {Math.ceil(utilitiesCount/100)}</p>
            <PageBar>{renderPages()}</PageBar>
            <button className="addButton button-primary">Add New Utility Company</button>
          </MainHeader>

          <MainBox>

            <MainTable className="admin-table">
                <thead>
                  <tr>
                    <th className="th-click">Company</th>
                    <th className="th-click">State</th>
                    <th className="th-click">Zip</th>
                    <th className="th-click"># Programs</th>
                    <th className="th-click">Status</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {renderUtilities()}
                </tbody>
                
            </MainTable>

          </MainBox>
        </ManageBox>
    </Container>
  )
}