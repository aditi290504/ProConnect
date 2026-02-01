import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function ViewProfile() {

    const searchParamers = useSearchParams();
  return (
    <div>
      ViewProfile
    </div>
  )
}
