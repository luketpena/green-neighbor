import React from 'react';
import styled from 'styled-components';
import Background from '../../images/bkg-forest-top.jpg';
import HomeButton from '../HomeButton/HomeButton';

const BackgroundBox = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 90%;
  height: 500px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  grid-template-rows: 100px 1fr;
  grid-template-areas: "questions answers" ;
  grid-template-columns: max-content 1fr ;
`;

const Header = styled.div`
  display: flex;
    align-items: center;
    justify-content: center;
    
  color: white;
  text-shadow: 0 0 4px black;
  h1 {
    font-family: var(--font-header);
    font-size: 64px;
    margin: 0;
  }
`;

const QBox = styled.div`
  grid-area: questions;
  grid-row: 2;

  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: right;
`;

const ABox = styled.div`
  grid-area: answers;
  grid-row: 2;
  height: 350px;
  overflow-y: scroll;
  background-color:rgba(250,250,250,0.8);
  font-family: var(--font-main);
`;

const Adiv = styled.div`
  padding: 15px 0px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default function AboutPage() {

  const faq = [
    {
      Q: 'What is this?',
      H: 'THERE IS A FUTURE BEYOND POLLUTION',
      A: 'The Green Neighbor Challenge is a campaign and tool to help get us there. Air Pollution caused over 100,000 American deaths and cost the economy $1495/person in 2015. We don’t have to keep polluting in our backyards. Most Americans can choose clean energy today, for less than the cost of Netflix. When we choose one another, we create hope. When we do it together, a new future is born. Will you join us?'
    },
    {
      Q: 'Am I Eligible?',
      H: 'IF YOU HAVE AN ELECTRIC BILL, YOU’RE IN!',  
      A: 'We did some homework. Nearly 7 out of 10 homes have access to a Green Energy Program. For everyone else, we aim to help you lobby your utility, your public utility commission, and your elected representatives to make choosing green an option for everyone. Also, we still have some pretty cool ideas about how you can help spread The Green Neighbor Challenge just like everyone else! #WontYouBeMine?'
    }, 
    {
      Q: 'Why Should I Sign Up?',
      H: 'MORE THAN I, THERE IS POWER IN "US"',
      A: 'Our elected representatives are not representing ‘We The People.’ Our lifespans are falling. Inequality is rising. We don’t need jobs where the side effect is cancer. Over the last 20 years, for every $1 spent preventing air pollution, there were $30 in social benefits. Despite this, billions are given to fossil fuel companies. We can stop this. We can choose us. Together, we will breathe easy again.'
    },
    {
      Q: 'What Does It Cost?',
      H: 'FAR LESS THAN A TRIP TO THE DOCTOR',
      A: 'Right now, the average home on the average program would pay under $10 /month for 100% clean energy. That’s about $4/person and is often much less for folks in apartments. The annual cost of healthcare is now over $10,000/person. Not only can wind turbines and solar panels improve our health, but over their lifespan, will actually drive down program and energy costs until we all have affordable, clean energy.'
    },
    {
      Q: 'How Does This Work?',
      H: 'ELECTRICITY IS MAGICAL. RECs ARE NOT',
      A: 'Your utility can measure how much energy is put on the grid, in the same way it measures how much you take off. When a unit of green energy is produced, a supplier receives a “Renewable Energy Certificate” or REC. When your utility buys your energy, they can also buy RECs to certify that it was green. So when you buy green energy, your utility “retires” RECs on your behalf. Every REC is unique and can be used only once.'
    },
    {
      Q: 'Who Benefits?',
      H: 'EVERYONE EXCEPT FOSSIL FUEL TYCOONS',
      A: 'We won’t pull punches. Developers and competitive green utilities stand to gain. But so do communities and farmers who lease land in exchange for a reliable source of clean income. Clean energy means clean jobs. No lung cancer required. Prairies, bees, and butterflies can be restored, pollinating nearby farms and purifying our water. Plus we all benefit from clean air, fewer doctor visits, and fewer climate disasters.'
    },
    {
      Q: 'Can I Trust You?',
      H: 'LET US BE AS TRANSPARENT AS CLEAR AIR',
      A: 'We care about clean water and air. We love our neighbors. We collect no personal information. We sell no products. We are a certified non-profit. We are powered by the forceful (foolish) will of ordinary people who would rather hustle for grants than become another middleman looking for a slice of your pie. We owe a debt to those who came before us, we aim to pay forward to those who come after.'
    },
  ];

  return(
    <BackgroundBox>
      <HomeButton />
    
    <Header>
        <h1>Frequently Asked Questions</h1>
    </Header>

    <Container>
      <QBox>
        {faq.map((item,id)=>{return<button key={`faq${id}`} className="button-primary" onClick={()=>document.getElementById(`faqanswer${id}`).scrollIntoView({behavior: "smooth"})}>{item.Q}</button>})}
      </QBox>
      
      <ABox className="container">
        {faq.map((answer,id)=>{return <Adiv key={`faq${id}`} id={`faqanswer${id}`}><h2>{answer.H}</h2><p>{answer.A}</p></Adiv>})}
      </ABox>
    </Container>
    </BackgroundBox>
  )
}
