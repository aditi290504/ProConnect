import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {

  const router = useRouter();

  return (
    
    <>
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h3>Connect with frnd..</h3>
          <p>True social media platform....</p>
          <div onClick={() => router.push('/login')} className="buttonJoin">
            <p>Join Now</p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <img src="images/connection.jpg" alt="Logo"  />
        </div>
      </div>
    </div>
      
    </>
  );
}
