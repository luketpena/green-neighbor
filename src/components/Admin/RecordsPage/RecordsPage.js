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
  background-color: gray;
  min-height: 500px;
  display: grid;
  grid-template-columns: 200px  1fr;
  grid-template-rows: 50px auto;
  grid-template-areas: "search filter" "search main";
`;

const SearchBox = styled.div`
  background-color: red;
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
`;

const FilterBox = styled.div`
  background-color: green;
  grid-area: filter;
  display: flex;
  align-items: center;
`;

const FilterOption = styled.div`
  background-color: lightgreen;
  margin: 8px;
  display: flex;
  align-items: center;
`;

const MainBox = styled.div`
  background-color: blue;
  grid-area: main;
`;

const MainHeader = styled.div`
  background-color: dodgerblue;
  padding: 8px;
  box-sizing: border-box;
  
  .addButton  {
    display: block;
    margin: 0 auto;
  }
  p {
    text-align: center;
  }
`;

const MainTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    background-color: yellow;
  }
`;

const PageButton = styled.button`
  display: inline;
  font-family: var(--font-main);
  font-size: 1em;
  background: none;
  border: none;
  outline: none;
  color: ${props=>(props.page===props.index? 'red' : 'white')};
  transition: transform .2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

const PageBar = styled.div`
  display: flex;
  justify-content: center;
`;


export default function RecordsPage() {

  const dispatch = useDispatch();
  const utilitiesCount = useSelector(state=>state.utilitiesCount);
  let [page, setPage] = useState(683);


  useEffect(()=>{
    dispatch({type: 'GET_UTILITIES'});
  },[utilitiesCount]);

  function renderUtilities() {

  }

  function renderPages() {
    let pageList = [];
    const pageMax = Math.ceil(utilitiesCount/100);

    function returnPageButton(index,goto,text) {
      return <PageButton key={index} index={index} page={page} onClick={()=>setPage(goto)}>{text}</PageButton>
    }

    if (page>5) {pageList.push(returnPageButton(-1,0,'<<'))}
    
    

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

    if (page<pageMax-6) {pageList.push(returnPageButton(pageMax,pageMax-1,'>>'))}
    return pageList;
  }

  return(
    <Container>
        <h1>Record Management</h1>
        {Math.ceil(utilitiesCount/100)}
        <ManageBox>

          <SearchBox>
            <form>
              <input type="number" placeholder="Zip Code" />
              <input type="text" placeholder="Utility Company" />
              <input type="text" placeholder="Energy Program" />
              <button className="button-primary">Search</button>
            </form>
          </SearchBox>

          <FilterBox>
            <FilterOption>
              <input type="checkbox" />
              <label>Show Drafts</label>
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              <label>Show Active</label>
            </FilterOption>
          </FilterBox>


          <MainBox>
            <MainHeader>
              <p>Page {page+1} of {Math.ceil(utilitiesCount/100)}</p>
              <PageBar>{renderPages()}</PageBar>
              <button className="addButton button-primary">Add New Utility Company</button>
            </MainHeader>
            <MainTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Zip</th>
                  <th>State</th>
                  <th># Programs</th>
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