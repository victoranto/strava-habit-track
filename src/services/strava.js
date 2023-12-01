// import axios from "axios";
// import { setUser } from '../redux/actions/userActions'
// import store from '../redux/store'

import { cleanStravaURL } from "../Helpers/StravaHelpers";

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

export const testAuthGetter = async (authTok) => {
    console.log('STRAVA :(')
    try {
        const response = await fetch(`https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&code=${authTok}&grant_type=authorization_code`, {
            method: 'POST',
        });

        if (!response.ok) {
            cleanStravaURL();
            throw new Error('Error al obtener el token de acceso');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getUserInfo = async (userID, accessToken) => {
    console.log('STRAVA :(')
    try {
        const response = await fetch(`https://www.strava.com/api/v3/athlete`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
            throw new Error('Error al obtener info User');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// export const getUserData = async (userID, accessToken) => {
//   try {
//       const response = await axios.get(
//           `https://www.strava.com/api/v3/athletes/${userID}/stats`,
//           { headers: { Authorization: `Bearer ${accessToken}` } }
//       );
//       return response;
//   } catch (error) {
//       console.log(error);
//   }
// };

// export const getUserInfo = async (accessToken) => {
//   try {
//       const response = await axios.get(
//           `https://www.strava.com/api/v3/athlete`,
//           { headers: { Authorization: `Bearer ${accessToken}` } }
//       );
//       store.dispatch(setUser(response.data));
//       return response;
//   } catch (error) {
//       console.log(error);
//   }
// };

// export const getActivities = async (accessToken) => {
//     try {
//         const response = await axios.get(
//             `https://www.strava.com/api/v3/athlete/activities`,
//             { headers: { Authorization: `Bearer ${accessToken}` } }
//         );
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
//   };

//   export const getActivitiesByDate = async (accessToken, from, to) => {
//     try {
//         console.log('to:', to, 'from:', from)
//         const response = await axios.get(
//             `https://www.strava.com/api/v3/athlete/activities`,
//             { headers: { Authorization: `Bearer ${accessToken}` }, params: { 'before': from, 'after':to } }
//         );
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
//   };

// export const getActivity = async (accessToken, id) => {
//     try {
//         const response = await axios.get(
//             `https://www.strava.com/api/v3/activities/${id}`,
//             { headers: { Authorization: `Bearer ${accessToken}` } }
//         );
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
//   };