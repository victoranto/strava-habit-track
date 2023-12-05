export const cleanStravaURL = () => {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
}

export const getPercentActivities = (total, num) => {
    console.log(total, num)
    return ((100*num)/total).toFixed(0)
}


export const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
  
    return `${hours}h ${minutes}m`
}