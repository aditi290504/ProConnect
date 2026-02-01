import React, { useEffect } from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'
import { useDispatch, useSelector } from 'react-redux';

export default function DiscoverPage() {

  const dispatch = useDispatch();
  
  const authState = useSelector((state) => state.auth);

  useEffect(()=>{
    if(authState.all_profiles_fetcted){
      dispatch(get)
    }
  })

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
