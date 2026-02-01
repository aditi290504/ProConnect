import React, { use } from 'react'
import { useRouter } from 'next/router';

export default function Dashboard() {

    const router = useRouter();

    useEffect(() => {
        if(!localStorage.getItem("token")=== null){
    })

  return (
    <div>
      <p>Dashboard</p>
    </div>
  )
}
