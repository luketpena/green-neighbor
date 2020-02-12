import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  h2 {
    text-align: center;
  }
`;



const DetailsBox = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  border-radius: 32px;
  overflow: hidden;
  margin-top: 50px;
`;

//captializes the letter of the column being brought in from DB


export default function SubmitDetails() {

    const [greenE, setGreenE] = useState();
    const [recsRetired, setRecsRetired] = useState();
    const [recsNeutral, setRecsNeutral] = useState();
    const [retail, setRetail] = useState();
    const [waitlist, setWaitlist] = useState();
    const [urlLink, setUrlLink] = useState();
    const [urlText, setUrlText] = useState();


    function renderDetails() {
        
            return(
                
                <form >
                    <label>Green-e Certified</label>
                    <input 
                        type="checkbox" 
                        value={greenE}></input>
                    <label>Recs Retired</label>
                    <input 
                        type="checkbox" 
                        value={recsRetired}></input>
                    <label>Recs Neutral</label>
                    <input 
                        type="checkbox" 
                        value={recsNeutral}></input>
                    <label>Retail</label>
                    <input 
                        type="checkbox" 
                        value={retail}></input>
                    <label>Waitlist Available</label>
                    <input 
                        type="checkbox" 
                        value={waitlist}></input>
                    <label>Sign Up or Enroll Link</label>
                    <input type="checkbox" value={urlLink}></input>
                    <label>Sign Up or Enroll Text</label>
                    <input type="checkbox" value={urlText}></input>
                </form>
            )
    }

    return (
        <Container>
          <h2>Details</h2>
          <DetailsBox>
              {renderDetails()}
          </DetailsBox>
        </Container>
      )



}