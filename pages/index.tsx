import { Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFirebase } from "react-redux-firebase";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const firebase = useFirebase();
  const history = useRouter();
  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/todos");
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>AprendeEnLinea | Inicio</title>
        <meta
          name="description"
          content="La mejor plataforma para aprender en linea"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button onClick={signInWithGoogle}>Login</Button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
