import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

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

    // List of values declared for state of form
    const [greenE, setGreenE] = useState();
    const [recsRetired, setRecsRetired] = useState();
    const [revsNeutral, setRevsNeutral] = useState();
    const [retail, setRetail] = useState();
    const [waitlist, setWaitlist] = useState();
    const [urlLink, setUrlLink] = useState();
    const [urlText, setUrlText] = useState();
    const dispatch = useDispatch();

   const updateSubmissionForm = obj => {
       dispatch({ type: 'UPDATE_FORM_SUBMISSION', payload: obj })
   }

    // List for on sets for above input values
    // useEffect( () => { setGreenE( greenE ); }, [greenE] );
    // useEffect( () => { setRecsRetired( recsRetired ); }, [recsRetired] );
    // useEffect( () => { setRecsNeutral( recsNeutral); }, [recsNeutral] );
    // useEffect( () => { setRetail( retail ); }, [retail] );
    // useEffect( () => { setWaitlist( waitlist ); }, [waitlist] );
    // useEffect( () => { setUrlLink( urlLink ); }, [urlLink] );
    // useEffect( () => { setUrlText( urlText ); }, [urlText] );



    function renderDetails() {
        
            return(
                
                <form >
                    <label>Green-e Certified</label>
                    <input 
                        type="checkbox" 
                        value={greenE}
                        onChange={e=>setGreenE(e.target.value)}
                        onBlur={e=>updateSubmissionForm({green_e: greenE})}
                        >
                    </input>
                    <label>Recs Retired</label>
                    <input 
                        type="checkbox" 
                        value={recsRetired}
                        onChange={e=>setRecsRetired(e.target.value)}
                        onBlur={e=>updateSubmissionForm({recs_retired: recsRetired})}
                        >
                    </input>
                    <label>Revenue Neutral</label>
                    <input 
                        type="checkbox" 
                        value={revsNeutral}
                        onChange={e=>setRevsNeutral(e.target.value)}
                        onBlur={e=>updateSubmissionForm({revenue_neutral: revsNeutral})}
                        >
                    </input>
                    <label>Retail</label>
                    <input 
                        type="checkbox" 
                        value={retail}
                        onChange={e=>setRetail(e.target.value)}
                        onBlur={e=>updateSubmissionForm({retail: retail})}
                        >
                    </input>
                    <label>Waitlist Available</label>
                    <input 
                        type="checkbox" 
                        value={waitlist}
                        onChange={e=>setWaitlist(e.target.value)}
                        onBlur={e=>updateSubmissionForm({waitlist: waitlist})}
                        >
                    </input>
                    <label>Sign Up or Enroll Link:</label>
                    <input 
                        type="text" 
                        value={urlLink}
                        onChange={e=>setUrlLink(e.target.value)}
                        onBlur={e=>updateSubmissionForm({sign_up_url: urlLink})}
                    >
                    </input>
                    <label>Sign Up or Enroll Text:</label>
                    <input 
                        type="text" 
                        value={urlText}
                        onChange={e=>setUrlText(e.target.value)}
                        onBlur={e=>updateSubmissionForm({sign_up_text: urlText})}
                        >
                    </input>
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