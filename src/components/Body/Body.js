import { useContext, useEffect, useState } from 'react';
import './Body.scss'
import { UserContext } from '../../context/user';
import { getUserStats } from '../../services/strava';
import { getPercentActivities, formatTime } from '../../Helpers/StravaHelpers';
import { Honeycomb } from '../Honeycomb/Honeycomb';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';


const Body = () => {
    const { state: userState, dispatch } = useContext(UserContext)
    const user = userState.stats
    const [total, setTotal] = useState(0)

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
        <>
        {userState.stats && (
            <>
                <Row>
                    <Col>
                        <Card bg="dark" data-bs-theme="dark">
                            <Card.Header>All-time Stats</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card bg="dark" data-bs-theme="dark">
                                            <Card.Header>
                                                <small>Ride</small>
                                                <ProgressBar striped variant="info" now={getPercentActivities(total, user.all_ride_totals.count)} label={`${getPercentActivities(total, user.all_ride_totals.count)}%`}></ProgressBar>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{user.all_ride_totals.count } activities</Card.Title>
                                                <Card.Text>
                                                    {formatTime(user.all_ride_totals.moving_time)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card bg="dark" data-bs-theme="dark">
                                            <Card.Header>
                                                <small>Run</small>
                                                <ProgressBar striped variant="info" now={getPercentActivities(total, user.all_run_totals.count)} label={`${getPercentActivities(total, user.all_run_totals.count)}%`}></ProgressBar>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{user.all_run_totals.count } activities</Card.Title>
                                                <Card.Text>
                                                    {formatTime(user.all_run_totals.moving_time)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card bg="dark" data-bs-theme="dark">
                                            <Card.Header>
                                                <small>Swim</small>
                                                <ProgressBar striped variant="info" now={getPercentActivities(total, user.all_swim_totals.count)} label={`${getPercentActivities(total, user.all_swim_totals.count)}%`}></ProgressBar>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{user.all_swim_totals.count } activities</Card.Title>
                                                <Card.Text>
                                                    {formatTime(user.all_swim_totals.moving_time)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Honeycomb></Honeycomb>
                    </Col>
                </Row>
            </>
        )}
        </>

    )
}
export default Body;