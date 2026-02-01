import React from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardL from '../dashboard'

export default function MyConnections() {
  return (
    <div>
       <UserLayout>
             <DashboardLayout>
                <h1>Dashboard</h1>
             </DashboardLayout>
          </UserLayout>
    </div>
  )
}
