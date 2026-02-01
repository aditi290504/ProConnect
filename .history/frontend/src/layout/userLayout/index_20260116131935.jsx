import Navbar from '@/components/navbar'
import React from 'react'

export default function UserLayout({children}) {
  return (
    <div>
        <Navbar/>
      {children}
    </div>
  )
}
