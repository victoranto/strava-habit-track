import './styles/global.scss';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Profile from './components/Profile/Profile';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { UserContext } from './context/user';
import { Col, Row } from 'react-bootstrap';


function App() {
  const { state: userState, dispatch } = useContext(UserContext);
  
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
      </Container>
    </div>
  );
}

export default App;
