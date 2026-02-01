import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction/index.js';
import { getAboutUser } from '@/config/redux/reducer/authReducer';

export default function Dashboard() {

    const router = useRouter();

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);

    const [isTokenThere , setIsTokenThere] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem("token")=== null){
            router.push("/login");
        }
        setIsTokenThere(true);
    })

    useEffect(() => {
        if(isTokenThere){
            dispatch(getAllPosts())
            dispatch(getAboutUser({token: localStorage.getItem("token")}) )
        }
    }, [isTokenThere])

  return (
    <div>
      {authState.}
    </div>
  )
}
