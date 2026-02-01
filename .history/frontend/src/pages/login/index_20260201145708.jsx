

import React, { use, useEffect, useState } from 'react'
import UserLayout from '../../layout/userLayout/index.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './style.module.css';
import { loginUser, registerUser } from '@/config/redux/action/authAction/index.js';
import { emptyMessage } from '@/config/redux/reducer/authReducer/index.js';

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

  useEffect(() => {
    if(localStorage.getItem("token")){
      router.push("/dashboard");
    }
  },[])

  useEffect(() => {
    dispatch(emptyMessage())
  }, [isLoginMethod])

  const handleRegister = () => {
    console.log("Register clicked");
    dispatch(registerUser({username, name, email, password}));
  }

  const handleLogin = () => {
    console.log("Login clicked");
    dispatch(loginUser({email, password}));
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
            .commentsContainer{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    justify-content: center;
    display: flex;
    align-items: center;
}

.allCommentsContainer{
    width: 40vw;
    height: 80vh;
    background: white;
    border-radius: 10px;
    position: relative;
    padding: 1.4rem;
}

            <div onClick={()=>{
              if(isLoginMethod){
                handleLogin();

              }else{
                handleRegister();
              }
            }} className={styles.buttonOutline}>
              {isLoginMethod ? "Login" : "Register"}
            </div>
          </div>
          
        </div>
        <div className={styles.cardContainer__right}>
            {isLoginMethod ? <p>Don`t have an Account? </p> : <p>Already have an Account? </p>}
            <div onClick={() =>{
              setUserLoginMethod(!isLoginMethod);
            }} style={{color:"black", textAlign:"center"}} className={styles.buttonOutline}>
              <p>{isLoginMethod ?   "Register":"Login"}</p>
            </div>
        </div>
      </div>
      </div>
      
    </UserLayout>
  )
}
