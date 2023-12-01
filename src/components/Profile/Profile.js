import { useContext, useEffect, useState } from "react";
import './Profile.scss'
import { UserContext } from "../../context/user";
import { getUserInfo } from "../../services/strava";

const Profile = () => {
    const { state: userState, dispatch } = useContext(UserContext);
    const user = userState.user
    
    useEffect(() => {
        const getUserData = async () => {
            const userData = await getUserInfo(userState.userId, userState.stravaToken);
            dispatch({type: 'SET_STRAVA_USER', payload: userData})
        }
        if(!userState.user){
            getUserData();
        }  
    }, [])

    return (
        <div className="profile">
            {userState.user && (
                <div>
                    <div className="foto">
                        <img src={user.profile} ></img>
                    </div>
                    <h1>{user.firstname} {user.lastname}</h1>
                    <h2>{user.city} - {user.country}</h2>
                </div>
            )}
        </div>
    )
}
export default Profile;