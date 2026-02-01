import React, { useEffect } from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'
import { getMyConnectionRequests } from '@/config/redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';

export default function MyConnections() {

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyConnectionRequests({token: localStorage.getItem("token")}));
  }, [])

  useEffect(() => {
    if(authState.connectionRequests.length != 0){
      console.log("Connection Requests: ", authState.connectionRequests);
    }
  }, [authState.connectionRequests])


  return (
    <div>
       <UserLayout>
             <DashboardLayout>
                <h1>MyConnections</h1>

                {authState.connectionRequests.length != 0 && authState.connectionRequests.connections.map((user) =>{
                  return(
                    <div className={styles }></div>
                  )
                })}
             </DashboardLayout>
          </UserLayout>
    </div>
  )
}
