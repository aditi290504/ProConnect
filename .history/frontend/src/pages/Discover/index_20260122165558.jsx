import React from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'
import { useDispatch } from 'react-redux';

export default function DiscoverPage() {

  const dispatch = useDispatch();
  
  const authState = useSel((state) => state.auth);

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
