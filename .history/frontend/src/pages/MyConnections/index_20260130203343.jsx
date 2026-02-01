import React, { useEffect } from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'

export default function MyConnections() {

  const dispatch = useDispatch();
  useEffect(() => {
    
  })
  return (
    <div>
       <UserLayout>
             <DashboardLayout>
                <h1>MyConnections</h1>
             </DashboardLayout>
          </UserLayout>
    </div>
  )
}
