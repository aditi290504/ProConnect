
import React from 'react'
import style from './styles.module.css'

export default function Navbar() {
  return (
    <div className={style.container}>
        <nav className={style.navBar}>
            <h1>Pro Connect</h1>

            <div className={style.navBarOptionContainer}>
                <div onClick={() => {
                    router("")
                }}></div>
            </div>
        </nav>

      
    </div>
  )
}
