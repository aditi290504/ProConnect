import DashboardLayout from '@/layout/dashboardLayout'
import UserLayout from '@/layout/userLayout'
import React from 'react'

export default function ProfilePage() {
  return (
    <UserLayout>
        <DashboardLayout>
            <div className={Styles.container}>
          <div className={Styles.backDropContainer}>
            <img className={Styles.backDrop} src={`${baseURL}/${userProfile.userId.profilePicture}`} alt="backgrd" />
          </div>
          <div className={Styles.profileContainer_details}>
            <div style={{display: "flex", gap: "0.7rem"}}>
              <div style={{flex: "0.8"}}>
                <div style={{display: "flex", width: "fit-content", alignItems: "center"}}>
                  <h2>{userProfile.userId.name}</h2>
                  <p style={{color: "grey"}}>@{userProfile.userId.username}</p>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                  {isCurrentUserInConnection ? 
                  <button className={Styles.connectedButton}>{isConnectionNull ? "Pending" : "Connected"}</button>
                  :
                  <button type="button" onClick={() => {
                    dispatch(sendConnectionRequest({token: localStorage.getItem("token"),  user_id: userProfile.userId._id}));

                  }} className={Styles.connectButton}>Connect</button>
                 }
                 <div onClick={async () =>{
                  const response = await clientServer.get(`/api/users/download_resume?id=${userProfile.userId._id}`);
                  window.open(`${baseURL}/${response.data.message}`, "_blank")
                 }} style={{width: "1.2em", cursor: "pointer"}}>
                  <i class="fa-solid fa-download"></i>
                 </div>
                </div>
                
                <div>
                  <p>{userProfile.bio}</p>
                  
                </div>
              </div>
              <div style={{flex: "0.2"}}>
                <h3>Recent Activity</h3>
                  {userPosts.map((post) => {
                    return(
                      <div key={post._id} className={Styles.postCard}>
                        <div className={Styles.card}>
                          <div className={Styles.card_profileContainer}>
                            {post.media !== "" ? <img src={`${baseURL}/${post.media}`} alt="post media" /> : <div style={{width:"3.4rem", height: "3.4rem"}}></div>}
                          </div>
                          <p>{post.body}</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>


          <div className={Styles.workHistory}>
            <h4>Work History</h4>

            <div className={Styles.workHistoryContainer}>
              {console.log(userProfile.pastWork)}
              {
                userProfile?.pastWork?.map((work, index) => {
                  
                  return (
                    <div key={index} className={Styles.workHistoryCard}>
                      <p style={{fontWeight: "bold", display: "flex", alignItems: "center", gap:"0.8rem"}}>{work.company} - {work.position}</p>
                      <p>{work.years}</p>
                      <p>Namaste..</p>
                      
                    </div>
                  )
                })
              }
            </div>
          </div>



        </div>
        </DashboardLayout>
    </UserLayout>
  )
}
