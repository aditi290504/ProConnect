

import React, { useEffect, useState } from 'react'
import UserLayout from '../../layout/userLayout/index.jsx';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './style.module.css';

export default function LoginComponent() {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  const isLoginMethod = useState(true)[0];

  useEffect(() => {
    if(authState.loggedIn){
      router.push("/dashboard");
    }
  })
  return (
    <UserLayout>
      div.
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__left}>
          <p>{isLoginMethod ? "Login" : "Register"}</p>
        </div>
        <div className={styles.cardContainer__right}></div>
      </div>
    </UserLayout>
  )
}
