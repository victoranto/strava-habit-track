import { type } from "@testing-library/user-event/dist/type";
import { createContext, useEffect, useReducer } from "react";

const initialState = {
    isLoged: false,
    stravaToken: null,
    userId: null,
    user: false,
    stats: false,
    activities: false,
    activitiesLoading: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                isLoged: true
            }
        }
        case "LOGOUT": {
            return initialState
        }
        case "RESTORE_STATE": {
            return { ...state, ...action.payload }
        }
        case "SET_STRAVA_TOKEN" : {
            return {
                ...state,
                isLoged: true,
                stravaToken: action.payload.accessToken,
                userId: action.payload.userId,
            }
        }
        case "SET_STRAVA_USER" : {
            return {
                ...state,
                user: action.payload,
            }
        }
        case "SET_STRAVA_USER_STATS" : {
            return {
                ...state,
                stats: action.payload,
            }
        }
        case "SET_STRAVA_ACTIVITIES" : {
            return {
                ...state,
                activities: action.payload,
                activitiesLoading: false,
            }
        }
        case "SET_STRAVA_ACTIVITIES_LOADING" : {            
            return {
                ...state,
                activitiesLoading: true,
            }
        }
        default: {
            return state
        }
    }
};

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const stateSaved = localStorage.getItem('userState')
        if(stateSaved != null){
            dispatch({ type: 'RESTORE_STATE', payload: JSON.parse(stateSaved)})
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('userState', JSON.stringify(state))
    }, [state])
    

    return (
         <UserContext.Provider value={{ state, dispatch }} >
            {children}
        </UserContext.Provider>
    )
}