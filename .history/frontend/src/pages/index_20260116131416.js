import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import serLayout from "../layout/userLayout/index.jsx";

export default function Home() {

  const router = useRouter();

  return (
    <userLayout>
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <p>Connect with frnd..</p>
          <p>True social media platform....</p>
          <div onClick={() => router.push('/login')} className={styles.buttonJoin}>
            <p>Join Now</p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <img src="images/connection.jpg" alt="Logo"  />
        </div>
      </div>
    </div>
      
    </userLayout>
  );
}
