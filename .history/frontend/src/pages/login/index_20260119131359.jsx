

import React, { useEffect, useState } from 'react'
import UserLayout from '../../layout/userLayout/index.jsx';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './style.module.css';

export default function LoginComponent() {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  const isLoginMethod = useState(false)[0];

  useEffect(() => {
    if(authState.loggedIn){
      router.push("/dashboard");
    }
  })
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
        <div className={styles.cardContainer__left}>
          <p className={styles.leftHeading}>{isLoginMethod ? "Login" : "Register"}</p>
          <div className={styles.inputContainer}>
            <div className={styles.inputRow}>
              <input type="text" className={styles.inputField} placeholder='Username' />
              <input type="text" className={styles.inputField} placeholder='Name' />
            </div>

            <input type="text" className={styles.inputField} placeholder='Email' />
            <input type="password" className={styles.inputField} placeholder='Password' />

            div.button
          </div>
          
        </div>
        <div className={styles.cardContainer__right}></div>
      </div>
      </div>
      
    </UserLayout>
  )
}
