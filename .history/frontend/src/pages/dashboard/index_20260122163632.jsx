import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction/index.js';
import {getAboutUser} from '@/config/redux/action/authAction/index.js'
import UserLayout from '@/layout/userLayout';
import DashboardLayout from '@/layout/dashboardLayout';
import { setTokenIsThere, setTokenIsNotThere } from '@/config/redux/reducer/authReducer';

export default function Dashboard() {

    const router = useRouter();

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);

   

    useEffect(() => {
        if(isTokenThere){
            console.log("Fetching posts and user profile");
            dispatch(getAllPosts())
            dispatch(getAboutUser({token: localStorage.getItem('token')}) )
        }
    }, [authState.isTokenThere])

  return (
    <UserLayout>
       <DashboardLayout>
          <h1>Dashboard</h1>
       </DashboardLayout>
    </UserLayout>
    
  )
}
