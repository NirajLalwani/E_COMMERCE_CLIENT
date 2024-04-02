import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useUserContext } from '../Context/UserContext';
import Loading from '../components/Loading';
import { BASE_URL } from '../../services/baseurl';

const Emailverify = () => {
    const Navigate = useNavigate();
    const [isVerified, setisVerified] = useState(true);
    const [linkExpired, setlinkExpired] = useState(false);
    const [isMounted, setisMounted] = useState(true)
    const params = useParams()
    const { setToken, getUserData } = useUserContext()
    const verifyMail = async () => {
        if (isMounted) {
            const response = await fetch(`${BASE_URL}/api/users/${params.token}/verify/${params._id}`, {
                method: "GET"
            });
            const data = await response.json()
            
            if (response.status === 200) {
                localStorage.setItem("token", data.token)
                setToken(data.token);
                getUserData();
                Navigate('/')
            } else if (response.status === 400) {
                setlinkExpired(true);
            }
        }
    }

    const resendMail = async () => {
        
        const response = await fetch(`${BASE_URL}/api/users/resend/mail`, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            toast.success("Mail Send Successfully");
        } else {
            Navigate('/404ErrorPage')
        }
    }

    useEffect(() => {
        if (isMounted) {
            verifyMail();
            setisMounted(false);
        }
    }, [])
    return (
        <>

            {linkExpired ?
                <h1>
                    Link Expired
                    <button onClick={resendMail}>
                        Resend
                    </button>
                </h1>
                :
                isVerified ?
                    <div id='LoadingPage'>
                        <Loading />
                    </div> :
                    <h1>
                        Verified..
                    </h1>
            }
            <ToastContainer />
        </>
    );
}

export default Emailverify


