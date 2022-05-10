import React from "react";
import { Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFirebase } from "react-redux-firebase";
import styles from "../styles/Home.module.css";
import { useAppSelector } from "shared/redux/hooks";
import MainTeacherView from "shared/pages/MainTeacherView";

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

  const user = useAppSelector((state) => state.user);

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
      {user.value?.rol === "PROFESOR" ? (
        <MainTeacherView />
      ) : (
        <>
          <main>
            <form
              method="post"
              action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
            >
              <input name="merchantId" type="hidden" value="508029" />
              <input name="accountId" type="hidden" value="512321" />
              <input name="description" type="hidden" value="Test PAYU" />
              <input
                name="referenceCode"
                type="hidden"
                value="TestPayU212121"
              />
              <input name="amount" type="hidden" value="20000" />
              <input name="tax" type="hidden" value="3193" />
              <input name="taxReturnBase" type="hidden" value="16806" />
              <input name="currency" type="hidden" value="COP" />
              <input
                name="signature"
                type="hidden"
                value="5ec1b406dbc6bb484bfb82e0be96eb20"
              />
              <input name="test" type="hidden" value="1" />
              <input name="buyerEmail" type="hidden" value="test@test.com" />
              <input
                name="responseUrl"
                type="hidden"
                value="http://www.test.com/response"
              />
              <input
                name="confirmationUrl"
                type="hidden"
                value="http://www.test.com/confirmation"
              />
              <Button type="submit">Pagar</Button>
            </form>
            <Button onClick={signInWithGoogle}>Login</Button>
            {user.isLogin && (
              <Button onClick={() => firebase.logout()}> logout</Button>
            )}
          </main>
          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span className={styles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer>
        </>
      )}
    </div>
  );
};

export default Home;
