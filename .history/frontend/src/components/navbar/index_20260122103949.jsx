
import React from 'react'
import style from './styles.module.css'
import { useRouter } from 'next/router';

export default function Navbar() {

    const router =  useRouter();

    const authState = useS

  return (
    <div className={style.container}>
        <nav className={style.navBar}>
            <h1 style={{cursor:"pointer"}} onClick={() => {
                router.push("/")
            }}>Pro Connect</h1>

            <div className={style.navBarOptionContainer}>
                <div onClick={() => {
                    router.push("/login")
                }} className={style.buttonJoin}>
                    <p>Be a part</p>
                </div>
            </div>
        </nav>
    </div>
  )
}
