

import React from 'react'
import UserLayout from '../../layout/userLayout/index.jsx';
import { useSelector } from 'react-redux';

export default function loginComponent() {

  const authState = useSelector((state) => state.auth);

  con
  return (
    <UserLayout>
      <p>Login Page</p>
    </UserLayout>
  )
}
