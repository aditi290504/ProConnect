import React, { useEffect } from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';
import { baseURL } from '@/config';
import Styles from './index.module.css';

export default function DiscoverPage() {

  const dispatch = useDispatch();
  
  const authState = useSelector((state) => state.auth);

  useEffect(()=>{
    if(!authState.all_profilesFetcted){
      dispatch(getAllUsers());
      console.log("done")
    }
  },[])

  return (
    <div>
       <UserLayout>
             <DashboardLayout>
                <h1>Discover</h1>
                <div className="allUserProfile">
                  {authState.all_profilesFetcted && authState.all_users.map((user)=>{
                    return (
                      <div key={user._id} className={Styles.userCard}>
                        <img src={`${baseURL}/${user.userId?.profilePicture}`} alt="" />
                        <h2>{user.userId?.name}</h2>
                        <p>{user.userId?.email}</p>
                      </div>
                    )
                  })}
                </div>
             </DashboardLayout>
          </UserLayout>
    </div>
  )
}
