import React, { useEffect } from 'react'
import UserLayout from '@/layout/userLayout'
import DashboardLayout from '@/layout/dashboardLayout'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';

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
                      <div key={user._id} className="userProfile">
                        <img src={`${ba}`} alt="" />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                      </div>
                    )
                  })}
                </div>
             </DashboardLayout>
          </UserLayout>
    </div>
  )
}
