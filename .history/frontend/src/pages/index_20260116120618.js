import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {

  const router = useRouter();

  return (
    
    <>
    <div className={scontainer">
      <div className="main-container">
        <div className="left-container">
          <h3>Connect with frnd..</h3>
          <p>True social media platform....</p>
          <div onClick={() => router.push('/login')} className="buttonJoin">
            <p>Join Now</p>
          </div>
        </div>
        <div className="right-container">
          <img src="images/connection.jpg" alt="Logo"  />
        </div>
      </div>
    </div>
      
    </>
  );
}
