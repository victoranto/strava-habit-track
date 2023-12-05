import { useContext, useEffect, useState } from 'react';
import './Body.scss'
import { UserContext } from '../../context/user';
import { getUserStats } from '../../services/strava';
import { getPercentActivities, formatTime } from '../../Helpers/StravaHelpers';

const Body = () => {
    const { state: userState, dispatch } = useContext(UserContext)
    const user = userState.stats
    const [total, setTotal] = useState(0)
    //console.log(total)

    useEffect(() => {
        const getStats = async () => {
            const userStats = await getUserStats(userState.userId, userState.stravaToken)
            dispatch({type:'SET_STRAVA_USER_STATS', payload: userStats})
        }
        if(!userState.stats){
            getStats()
        }
    }, [])

    useEffect(() => {
        if(userState.stats){
            setTotal(userState.stats.all_ride_totals.count + userState.stats.all_run_totals.count + userState.stats.all_swim_totals.count)
        }
    },[userState])

    return (
        <div className='body'>
            {userState.stats && (
                <div>
                    <section className='stats'>
                    <h3>All-time Stats</h3>
                    <div className='boxes'>
                        <div className="box">
                        <div>
                            <div className="chart">{getPercentActivities(total, user.all_ride_totals.count)}%</div>
                            <div className="progress">
                                <div className='percent' style={{ width: getPercentActivities(total, user.all_ride_totals.count) + '%' }}></div>
                            </div>
                            <div className="summary">
                            <h4>Ride</h4>
                            <p>{user.all_ride_totals.count }</p>
                            <p>{formatTime(user.all_ride_totals.moving_time)}</p>
                            </div>
                        </div>
                        </div>
                        <div className="box">
                        <div>
                            <div className="chart">{getPercentActivities(total, user.all_run_totals.count)}%</div>
                            <div className="progress">
                                <div className='percent' style={{ width: getPercentActivities(total, user.all_run_totals.count) + '%' }}></div>
                            </div>
                            <div className="summary">
                            <h4>Run</h4>
                            <p>{user.all_run_totals.count }</p>
                            <p>{formatTime(user.all_run_totals.moving_time)}</p>
                            </div>
                        </div>
                        </div>
                        <div className="box">
                        <div>
                            <div className="chart">{getPercentActivities(total, user.all_swim_totals.count)}%</div>
                            <div className="progress">
                                <div className='percent' style={{ width: getPercentActivities(total, user.all_swim_totals.count) + '%' }}></div>
                            </div>
                            <div className="summary">
                            <h4>Swim</h4>
                            <p>{user.all_swim_totals.count }</p>
                            <p>{formatTime(user.all_swim_totals.moving_time)}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                </div>
            )}
        </div>

    )
}
export default Body;