import { clientServer } from '@/config';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

export default function ViewProfile(userProfile) {

    const searchParamers = useSearchParams();

    const router = useRouter();

    useEffect(() => {
      console.log("From view: view profile page")
    })
  return (
    <div>
      {user}
    </div>
  )
}

export async function getServerSideProps(context) {
  console.log("From View")
  console.log(context.query.username)

  const request = await clientServer.get("/get_user_profile_by_username", {
    params: {
      username: context.query.username
    }
  })

  const response = await request.data;
  console.log(response)

  return{ props: {userProfile: request.data.profile}}
  
}
