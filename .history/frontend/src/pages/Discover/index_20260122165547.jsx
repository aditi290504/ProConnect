import React from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'

export default function DiscoverPage() {

  const dispatch = useh();
  
  const authState = useSelector((state) => state.auth);

  return (
    <div>
       <UserLayout>
             <DashboardLayout>
                <h1>Discover</h1>
             </DashboardLayout>
          </UserLayout>
    </div>
  )
}
