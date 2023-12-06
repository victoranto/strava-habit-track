import { useContext, useEffect } from 'react'
import './Honeycomb.scss'
import { UserContext } from '../../context/user'
import { getActivities } from '../../services/strava';

export const Honeycomb = () => {
    const {state: userState, dispatch } = useContext(UserContext)

    function generarDiasDelAnio() {
        const diasDelAnio = [];
        const meses = 12; // Número de meses en un año
        
        for (let mes = 0; mes < meses; mes++) {
            const diasEnElMes = new Date(2023, mes + 1, 0).getDate(); // Obtiene la cantidad de días en el mes actual
            for (let dia = 1; dia <= diasEnElMes; dia++) {
            const fecha = new Date(2023, mes, dia);
            diasDelAnio.push(fecha.toLocaleDateString()); // Agrega la fecha al array como string
            }
        }
        
        return diasDelAnio;
    }
    const listadoDiasAnio = generarDiasDelAnio();

    function buscarFechaEnObjetos(fechaBuscada) {
        const fechaEncontrada = userState.activities.find(objeto => {
            const startD = new Date(objeto.start_date).toLocaleDateString();
            return startD === fechaBuscada
        });
        return fechaEncontrada !== undefined ? true : false;
    }
    // const resultadoBusqueda = buscarFechaEnObjetos("5/15/2023");
    

    useEffect(() => {
        const getActs = async () => {
            const act = await getActivities(userState.stravaToken, 1)
            dispatch({type:'SET_STRAVA_ACTIVITIES', payload: act})
        }
        if(!userState.activities){
            getActs()
        }
    },[])

    return (
        <section className="honeycomb">
            <h3>Year activities 2023</h3>
            {userState.activities && ( 
                <div className="grid">
                    {listadoDiasAnio.map( date  => {
                        return (<div className={`item ${buscarFechaEnObjetos(date) ? "active" : ""}`} data-date={date} ></div>)
                    })}
                </div>
            )}
        </section>
    )
}