import { useContext, useEffect } from 'react';
import './Body.scss'
import { UserContext } from '../../context/user';
import { getUserStats } from '../../services/strava';

const Body = () => {
    const { state: userState, dispatch } = useContext(UserContext)
    const user = userState.stats

    useEffect(() => {
        const getStats = async () => {
            const userStats = await getUserStats(userState.userId, userState.stravaToken)
            dispatch({type:'SET_STRAVA_USER_STATS', payload: userStats})
        }
        if(!userState.stats){
            getStats()
        }
    }, [])

    return (
        <div>
            {userState.user && (
                
                <div>
                    <h1>User Stats</h1>
                    <ul>
                    <li>All ride totals: {user.all_ride_totals.count}</li>
                    <li>All run totals: {user.all_run_totals.count}</li>
                    <li>All swim totals: {user.all_swim_totals.count}</li>
                    </ul>
                </div>
            )}
        </div>

    )
}
export default Body;