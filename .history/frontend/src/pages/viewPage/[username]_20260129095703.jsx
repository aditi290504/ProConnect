import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
import React from 'react'

export default function ViewProfile() {

    const searchParamers = useSearchParams();

    const router = useRouter();
  return (
    <div>
      ViewProfile
    </div>
  )
}

export async function getServerSidePro(params) {
  
}
