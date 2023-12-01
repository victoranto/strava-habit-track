import './styles/global.scss';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
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
              <Login></Login>
            </div>
          )
          }
        </div>
    </div>
  );
}

export default App;
