import { useContext, useEffect } from 'react';
import './Header.scss'
import { UserContext } from '../../context/user';
import { testAuthGetter } from '../../services/strava';
import { cleanStravaURL } from '../../Helpers/StravaHelpers';

const { REACT_APP_CLIENT_ID, REACT_APP_STRAVA_REDIRECT_URL } = process.env

const Header = () => {
    const { state: userState, dispatch } = useContext(UserContext)
    
    const handleLogin = () => {
        window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_STRAVA_REDIRECT_URL}/?approval_prompt=force&scope=activity:read_all`;
    };

    useEffect(() => {
        const authenticate = async () => {

            try {    
                
                const currentUrl = window.location.href;
                const urlParams = new URLSearchParams(currentUrl);
                const codeParam = urlParams.get('code');
                if(codeParam){
                    const tokens = await testAuthGetter(codeParam);   
                    dispatch({type: "SET_STRAVA_TOKEN", 
                        payload: {
                            accessToken: tokens.access_token,
                            userId: tokens.athlete.id,
                        } 
                    })
                    cleanStravaURL();
                }   
            } catch (error) {
                dispatch({type: "LOGOUT"})
            }
        }
        authenticate();
      }, []); 
    
    return (
        <header className='container'>
            <div className='logo'><span>SHT</span></div>
            <div className='login'>
                {userState.isLoged && (
                    <button className='btn' onClick={() => dispatch({type: "LOGOUT"})} >Logout</button>
                )}
                {!userState.isLoged && (
                    <button className='btn' onClick={handleLogin} >Login</button>
                )}
                
            </div>
        </header>
    )
}
export default Header;