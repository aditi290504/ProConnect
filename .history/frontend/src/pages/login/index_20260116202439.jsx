

import React, { useEffect } from 'react'
import UserLayout from '../../layout/userLayout/index.jsx';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './login.module.css';

export default function LoginComponent() {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if(authState.loggedIn){
      router.push("/dashboard");
    }
  })
  return (
    <UserLayout>
      <p>Loe</p>
    </UserLayout>
  )
}
