import { cleanStravaURL, getUnixTimestamp } from "../Helpers/StravaHelpers";

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

export const getUserInfo = async (accessToken) => {
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

export const getUserStats = async (userID, accessToken) => {
  try {
        const response = await fetch(
            `https://www.strava.com/api/v3/athletes/${userID}/stats`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) {
            throw new Error('Error al obtener info User');
        }
        const data = await response.json();
        return data;
  } catch (error) {
      console.log(error);
  }
};



export const getActivities = async (accessToken, page, year, result = null) => {
    const perPage = 50;

    const fromDate = getUnixTimestamp(`${year}-01-01T00:00:00Z`);
    const toDate = getUnixTimestamp(`${year}-12-31T23:59:59Z`);

    const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${fromDate}&before=${toDate}&page=${page}&per_page=${perPage}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    const data = await response.json();
    if (!result) {
        result = data;
    } else {
        result.push(...data);
    }
    if (data.length > 0) {
        result = await getActivities(accessToken, page + 1, year, result);
    }
    return result;
};