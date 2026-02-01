

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

  const [userLoginMethod, setUserLoginMethod] = useState(true);

  const isLoginMethod = userLoginMethod;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if(authState.loggedIn){
      router.push("/dashboard");
    }
  },[authState.loggedIn]);

  const handleRegister = () => {
    console.log("Register clicked");
    dispatch(registerUser({username, name, email, password}));
  }
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
        <div className={styles.cardContainer__left}>
          <p className={styles.leftHeading}>{isLoginMethod ? "Login" : "Register"}</p>

          <p style={{color: authState.isError ? "red" : "green"}}>{authState.message.message}</p>
          <div className={styles.inputContainer}>

            {!isLoginMethod && <div className={styles.inputRow}>
              <input onChange={(e) => setUsername(e.target.value)} type="text" className={styles.inputField} placeholder='Username' />
              <input onChange={(e) => setName(e.target.value)} type="text" className={styles.inputField} placeholder='Name' />
            </div>}

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
        <div className={styles.cardContainer__right}>
          <div>
            {isLoginMethod ? <p>Don`t have an Account? </p> : <p>Already have an Account? </p>}
            <div onClick={() =>{
              setUserLoginMethod(!isLoginMethod);
            }} style={{color:"black"}}></div>
          </div>
        </div>
      </div>
      </div>
      
    </UserLayout>
  )
}
