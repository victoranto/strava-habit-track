import './styles/global.scss';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Profile from './components/Profile/Profile';
import { useContext } from 'react';
import { UserContext } from './context/user';

function App() {
  const { state: userState, dispatch } = useContext(UserContext);
  
  return (
    <div className="App">
      <Header></Header>
      <div className='container body-app'>
          { userState.isLoged && (
            <div>
              <Profile></Profile>
              <Body></Body>
            </div>
          )
          }
        </div>
    </div>
  );
}

export default App;
