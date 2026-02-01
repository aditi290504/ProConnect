import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import UserLayout from "../layout/userLayout/index.jsx";

export default function Home() {

  const router = useRouter();

  return (
    <UserLayout>
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <p>Build your career. Not just your profile.</p>
          <p>Start early. Build your network before graduation.Your first opportunity shouldn’t be your first connection.</p>
          <div onClick={() => router.push('/login')} className={styles.buttonJoin}>
            <p>Join Now</p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <img src="images/connection.jpg" alt="Logo"  />
        </div>
      </div>
    </div>
      
    </UserLayout>
  );
}
