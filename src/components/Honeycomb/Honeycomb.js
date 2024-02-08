import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../context/user'
import { getActivities } from '../../services/strava'
import { Card, Spinner } from 'react-bootstrap'
import { 
    XIcon, 
    TwitterShareButton, 
    WhatsappIcon, 
    WhatsappShareButton,
    RedditShareButton,
    RedditIcon,
    TelegramIcon,
    TelegramShareButton,
    FacebookIcon,
    FacebookShareButton,
} from 'react-share'

import './Honeycomb.scss'
import html2canvas from 'html2canvas'
import { storage } from '../../services/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const shareTitle = "This year was about consistency, pushing limits, and hitting goals. Join me in celebrating our athletic journey! 🏊‍♂️🏃‍♀️🚴 #StravaHabitsTrack #StravaYear #AthleticMilestones #PersonalAchievement"

export const Honeycomb = () => {
    const {state: userState, dispatch } = useContext(UserContext)
    const printRef = useRef()
    const [imageUrl, setImageUrl] = useState('')
    const year = new Date().getFullYear()

    function generarDiasDelAnio() {
        const diasDelAnio = []
        const meses = 12
        
        for (let mes = 0; mes < meses; mes++) {
            const diasEnElMes = new Date(year, mes + 1, 0).getDate() 
            for (let dia = 1; dia <= diasEnElMes; dia++) {
            const fecha = new Date(year, mes, dia)
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
            const act = await getActivities(userState.stravaToken, 1, year)
            setTimeout(() => {
                generateImage()
            }, 1000);
            dispatch({type:'SET_STRAVA_ACTIVITIES', payload: act})
        }
        if(!userState.activities){
            getActs()
        }
        
        const generateImage = async () => {
            const element = printRef.current
            const canvas = await html2canvas(element)

            canvas.toBlob((blob) => {
                if (blob) {
                    let rName = (Math.random() + 1).toString(36).substring(7);
                    
                    const storageRef = ref(storage, rName);

                    uploadBytes(storageRef, blob).then((snapshot) => {
                        getDownloadURL(ref(storage, rName))
                        .then((url) => {
                            dispatch({type:'SET_STRAVA_ACTIVITIES_SHARE_URL', payload: url})             
                        })
                    });
                }
            }, 'image/png');
        }

    },[])

    return (
        <section className="honeycomb mt-3">
            <Card bg="dark" data-bs-theme="dark" ref={printRef}>
                <Card.Header>Year in Motion: {year} Activity Showcase</Card.Header>
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
            {userState.shareUrl && ( 
                <div className='shareButtons'>
                    <h6>Share your annual Strava summary and let everyone know what you've achieved.</h6>
                    <TwitterShareButton url={userState.shareUrl} title={shareTitle}>
                        <XIcon size={32} round={true} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={userState.shareUrl} title={shareTitle}>
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                    <RedditShareButton
                    url={userState.shareUrl}
                    title={shareTitle}
                    windowWidth={660}
                    windowHeight={460}
                    >
                        <RedditIcon size={32} round />
                    </RedditShareButton>
                    <TelegramShareButton
                        url={userState.shareUrl}
                        title={shareTitle}
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <FacebookShareButton
                        url={userState.shareUrl}
                        title={shareTitle}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>
            )}
            
        </section>
    )
}