import { useContext, useEffect } from 'react'
import './Honeycomb.scss'
import { UserContext } from '../../context/user'
import { getActivities } from '../../services/strava'
import { Card, Spinner } from 'react-bootstrap'

export const Honeycomb = () => {
    const {state: userState, dispatch } = useContext(UserContext)

    function generarDiasDelAnio() {
        const diasDelAnio = []
        const meses = 12
        
        for (let mes = 0; mes < meses; mes++) {
            const diasEnElMes = new Date(2023, mes + 1, 0).getDate() 
            for (let dia = 1; dia <= diasEnElMes; dia++) {
            const fecha = new Date(2023, mes, dia)
            diasDelAnio.push(fecha.toLocaleDateString())
            }
        }
        return diasDelAnio
    }

    const  searchDateOnActivities = date => {
        const is_date = userState.activities.find(activity => {
            const startD = new Date(activity.start_date).toLocaleDateString()
            return startD === date
        })
        return is_date !== undefined ? true : false
    }

    useEffect(() => {
        const getActs = async () => {
            dispatch({type:'SET_STRAVA_ACTIVITIES_LOADING'})
            const act = await getActivities(userState.stravaToken, 1, 2023)
            dispatch({type:'SET_STRAVA_ACTIVITIES', payload: act})
        }
        if(!userState.activities){
            getActs()
        }
    },[])

    return (
        <section className="honeycomb mt-3">
            <Card bg="dark" data-bs-theme="dark">
                <Card.Header>Year activities 2023</Card.Header>
                <Card.Body>
                    {userState.activitiesLoading && (
                        <>
                            <Spinner animation="border" role="status"></Spinner>{' '}
                            <span><small>Loading...</small></span>
                        </>
                    )}
                    {userState.activities && ( 
                        <div className="grid">
                            {generarDiasDelAnio().map( date  => {
                                return (<div className={`item ${searchDateOnActivities(date) ? "active" : ""}`} data-date={date} key={date} ></div>)
                            })}
                        </div>
                    )}
                </Card.Body>
            </Card>
        </section>
    )
}