import './styles/global.scss';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Profile from './components/Profile/Profile';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { UserContext } from './context/user';
import { Col, Row, Image, Button } from 'react-bootstrap';

import strava from './assets/strava.svg'
import bgFemale from './assets/strava_female.jpg'

const { REACT_APP_CLIENT_ID, REACT_APP_STRAVA_REDIRECT_URL } = process.env


function App() {
  const { state: userState, dispatch } = useContext(UserContext);

  const handleLogin = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_STRAVA_REDIRECT_URL}/?approval_prompt=force&scope=activity:read_all`;
};
  
  return (
    <div className="App">
      <Header></Header>
      <Container className='mt-5'>
            { userState.isLoged && (
              <Row>
                <Col md={2}>
                  <Profile></Profile>
                </Col>
                <Col md={10}>
                  <Body></Body>
                </Col>
              </Row>
            )
            }
            { !userState.isLoged && (
              <Row className="home">
                <Col md={8} className="align-items-center">
                  <h1 className='slogan'>
                    <span className='line'>It's Not Just Exercise. </span><br/> 
                    <span className='color'>It's Progress.</span>
                  </h1>
                  <p>Effortlessly monitor and visualize exercise progress, transforming activity habits into intuitive, appealing visuals.</p>
                  <Button variant="btn btn-info" size="lg" onClick={handleLogin}>
                    Start your adventure
                  </Button>
                </Col>
                <Col md={4}>
                  <Image src={bgFemale} />
                </Col>
              </Row>
            )
            }
      </Container>
      <footer className="fixed-bottom">
            <Container>
              <Row>
                <Col>
                  <p>
                    <small>Made in Barcelona with ❤️ by <a href='https://twitter.com/victorarroba' target='_blank'>@victoranto</a></small>
                  </p>
                </Col>
                <Col>
                  <p className='float-end'>
                    <Image src={strava} />
                  </p>  
                </Col>
              </Row>
              
            </Container>
      </footer>
      
    </div>
  );
}

export default App;
