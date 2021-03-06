import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Container,
  Typography,
  Box,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { toast } from "react-toastify";
import { finishLoad, startLoad } from "shared/redux/slices/loadingSlice";
import { setLoginFalse, setLoginTrue } from "shared/redux/slices/userSlice";
import SelectController from "shared/UI/components/SelectController";
import TextFieldController from "shared/UI/components/TextfieldController";
import styles from "styles/login.module.css";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm<{
    email: string;
    password: string;
    rol: string;
  }>();
  const firebase = useFirebase();
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const onSubmit = async (data: {
    email: string;
    password: string;
    rol: string;
  }) => {
    try {
      dispatch(startLoad());
      await firebase.createUser(
        {
          email: data.email,
          password: data.password,
        },
        { rol: data.rol, email: data.email }
      );
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`${error?.message}`, {});
    } finally {
      dispatch(finishLoad());
    }
  };
  const reFetchProfile = () => {
    dispatch(startLoad());
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          dispatch(setLoginFalse());
        } else {
          await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .onSnapshot((doc) => {
              if (doc.exists) {
                dispatch(setLoginTrue({ ...doc.data(), id: doc.id }));
                router.push("/");
              }
            });
        }
      } finally {
        dispatch(finishLoad());
      }
    });
  };

  React.useEffect(() => {
    reFetchProfile();
  }, []);

  return (
    <>
      <Head>
        <title>AprendeEnLinea | Registro</title>
      </Head>
      <Container className={styles.container}>
        <img
          src="assets/Group 17.png"
          alt="decorations"
          className={styles.img}
        />
        <Typography
          color="#4ABCFE"
          fontSize="18px"
          onClick={() => router.push("/")}
        >
          AprendeEnLinea
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Box>
            <Typography color="#151143" fontSize="16px">
              Hola vamos a aprender ????
            </Typography>
            <Typography fontWeight="bold" color="#151143" fontSize="24px">
              Registrate <br /> para empezar a aprender
            </Typography>
          </Box>
          <Box className={styles.MainFormContainer}>
            <Box className={styles.secondaryFormContainer}>
              <TextFieldController
                control={control}
                name="email"
                label="Correo electronico"
              />
              <TextFieldController
                control={control}
                name="password"
                type={showPass ? "text" : "password"}
                label="contrase??a"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPass(!showPass)}
                        onMouseDown={(event: { preventDefault: () => void }) =>
                          event.preventDefault()
                        }
                        edge="end"
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <SelectController control={control} name="rol" label="Rol">
                <MenuItem value="PROFESOR">Profesor</MenuItem>
                <MenuItem value="ESTUDIANTE">Estudiante</MenuItem>
              </SelectController>
            </Box>
            <Button fullWidth type="submit" color="primary" variant="contained">
              Registrarse
            </Button>
            <Button
              fullWidth
              onClick={() => router.push("/login")}
              color="primary"
            >
              Iniciar sesi??n
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default RegisterPage;
