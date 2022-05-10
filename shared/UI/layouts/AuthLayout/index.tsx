import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { setLoginFalse, setLoginTrue } from "shared/redux/slices/userSlice";
import Loader from "shared/UI/components/Loader";

const AuthLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const firebase = useFirebase();

  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();

  const reFetchProfile = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/register");
        dispatch(setLoginFalse());
        setUser(null);
      } else {
        console.log(user);
        await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              dispatch(setLoginTrue({ ...doc.data(), id: doc.id }));
            }
          });
        setUser(user);
      }
    });
  };

  React.useEffect(() => {
    reFetchProfile();
  }, []);
  return <>{user ? children : <Loader load={true} />}</>;
};

export default AuthLayout;
