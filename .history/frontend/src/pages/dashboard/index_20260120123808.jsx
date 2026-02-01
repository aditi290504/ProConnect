import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router';


export default function Dashboard() {

    const router = useRouter();

    const dispatch = useDispatch();

    const [isTokenThere , setIsTokenThere] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem("token")=== null){
            router.push("/login");
        }
        setIsTokenThere(true);
    })

    useEffect(() => {
        if(isTokenThere){
            dispatch(getAllPosts());
        }
    }, [isTokenThere])

  return (
    <div>
      <p>Dashboard</p>
    </div>
  )
}
