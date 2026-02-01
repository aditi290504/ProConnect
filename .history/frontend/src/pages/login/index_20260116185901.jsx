

import React, { use } from 'react'
import UserLayout from '../../layout/userLayout/index.jsx';
import { useSelector } from 'react-redux';
im

export default function LoginComponent() {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {})
  return (
    <UserLayout>
      <p>Login Page</p>
    </UserLayout>
  )
}
