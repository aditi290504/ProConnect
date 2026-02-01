import Head from "next/head";

export default function Home() {

  const router = useRouter();

  return (
    
    <>
    <div className="container">
      <div className="main-container">
        <div className="left-container">
          <h3>Connect with frnd..</h3>
          <p>True social media platform....</p>
          <button onClick={() => router.push('/login')}>Get Started</button>
        </div>
        <div className="right-container">
          <img src="images/connection.jpg" alt="Logo"  />
        </div>
      </div>
    </div>
      
    </>
  );
}
