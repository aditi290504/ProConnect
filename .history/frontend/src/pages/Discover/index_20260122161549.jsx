import React from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'

export default function DiscoverPage() {
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
