import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import createEmotionCache from "../shared/utility/createEmotionCache";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import "../styles/globals.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../firebase/config";
import { createFirestoreInstance } from "redux-firestore";
import { store } from "shared/redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Loader from "shared/UI/components/Loader";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.firestore();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ThemeProvider theme={lightTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <Component {...pageProps} />
              <Loader />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </LocalizationProvider>
          </ThemeProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </CacheProvider>
  );
};

export default MyApp;
