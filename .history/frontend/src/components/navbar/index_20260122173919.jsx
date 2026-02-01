
import React, { useState } from 'react'
import style from './styles.module.css'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Navbar() {

    const router =  useRouter();

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
                        <p>Hey {authState?.user?.userId?.name}</p>
                        <p style={{fontWeight:"bold", cursor:"pointer"}}>Profile</p>
                        <p style={{fontWeight:"bold", cursor:"pointer"}}>Profile</p>                        
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
