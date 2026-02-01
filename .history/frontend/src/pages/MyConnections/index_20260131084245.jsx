import React, { useEffect } from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'
import { getMyConnectionRequests } from '@/config/redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '@/config';
import styles from './index.module.css'

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

                {authState.connectionRequests.length != 0 && authState.connectionRequests.connections.map((user, index) =>{
                  return(
                    <div className={styles.userCard} key={index}>
                      <div style={{display: "flex", alignItems: "center", }}>
                        <div className={styles.profilePicture}>
                          <img src={`${baseURL}/${user.userId.profilePicture}`} alt="pic" />
                        </div>
                        <div className={styles.userInfo}>
                          <h3>{user.userId.name}</h3>
                          <p>{user.userId.username}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
             </DashboardLayout>
          </UserLayout>
    </div>
  )
}
