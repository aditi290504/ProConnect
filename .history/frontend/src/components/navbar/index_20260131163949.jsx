
import React, { useState } from 'react'
import style from './styles.module.css'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/config/redux/reducer/authReducer';

export default function Navbar() {

    const router =  useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth)

  return (
    <div className={style.container}>
        <nav className={style.navBar}>
            <h1 style={{cursor:"pointer"}} onClick={() => {
                router.push("/")
            }}>Pro Connect</h1>

            <div className={style.navBarOptionContainer}>

                {authState.profileFetched && <div>
                    <div style={{display:"flex", gap:"1.2rem"}}>
                        <p onClick={() =>{
                            router.push("/profile")
                        }} style={{fon}}>Hey {authState?.user?.userId?.name}</p>
                        <p style={{fontWeight:"bold", cursor:"pointer"}}>Profile</p>
                        <p onClick={()=>{
                            localStorage.removeItem("token")
                            router.push("/login")
                            dispatch(reset())
                        }} style={{fontWeight:"bold", cursor:"pointer"}}>Log Out</p>                        
                    </div>
                 </div>}

                {!authState.profileFetched && <div onClick={() => {
                    router.push("/login")
                  }} className={style.buttonJoin}>
                    <p>Be a part</p>
                    
                </div>}
                
            </div>
        </nav>
    </div>
  )
}
