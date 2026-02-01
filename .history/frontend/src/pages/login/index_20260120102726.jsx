

import React, { useEffect, useState } from 'react'
import UserLayout from '../../layout/userLayout/index.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './style.module.css';
import { loginUser, registerUser } from '@/config/redux/action/authAction/index.js';

export default function LoginComponent() {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch();

  const isLoginMethod = useState(false)[0];

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [Name, setName] = useState("");

  useEffect(() => {
    if(authState.loggedIn){
      router.push("/dashboard");
    }
  })

  const handleRegister = () => {
    console.log("Register clicked");
    dispatch(registerUser({name, email, password, username}));
  }
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
        <div className={styles.cardContainer__left}>
          <p className={styles.leftHeading}>{isLoginMethod ? "Login" : "Register"}</p>
          <div className={styles.inputContainer}>
            <div className={styles.inputRow}>
              <input onChange={(e) => setUsername(e.target.value)} type="text" className={styles.inputField} placeholder='Username' />
              <input onChange={(e) => setName(e.target.value)} type="text" className={styles.inputField} placeholder='Name' />
            </div>

            <input onChange={(e) => setEmail(e.target.value)} type="text" className={styles.inputField} placeholder='Email' />
            <input onChange={(e) => setPassword(e.target.value)} type="password" className={styles.inputField} placeholder='Password' />

            <div onClick={()=>{
              if(isLoginMethod){
                loginUser({Email, Password});

              }else{
                handleRegister();
              }
            }} className={styles.buttonOutline}>
              {isLoginMethod ? "Login" : "Register"}
            </div>
          </div>
          
        </div>
        <div className={styles.cardContainer__right}></div>
      </div>
      </div>
      
    </UserLayout>
  )
}
