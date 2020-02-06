import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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
  button {
    display: block;
    margin: 0 auto;
  }
`;

const MainTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    background-color: yellow;
  }
`;


export default function RecordsPage() {

  return(
    <Container>
        <h1>Record Management</h1>
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
              <button className="button-primary">Add New Utility Company</button>
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
            </MainTable>
          </MainBox>
        </ManageBox>
    </Container>
  )
}