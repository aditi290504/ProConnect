import React, { useEffect } from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'
import { getMyConnectionRequests } from '@/config/redux/action/authAction';
import { useDispatch } from 'react-redux';

export default function MyConnections() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyConnectionRequests());
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
