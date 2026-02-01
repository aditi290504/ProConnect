import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Dashboard() {

    const router = useRouter();

    const [is]

    useEffect(() => {
        if(!localStorage.getItem("token")=== null){
            router.push("/login");
        }
    })

  return (
    <div>
      <p>Dashboard</p>
    </div>
  )
}
