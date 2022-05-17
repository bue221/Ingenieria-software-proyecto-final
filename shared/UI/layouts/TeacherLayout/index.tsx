import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useFirebase } from "react-redux-firebase";
import AuthLayout from "../AuthLayout";

const TeacherLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const firebase = useFirebase();

  return (
    <>
      <AuthLayout>
        <Container
          sx={{
            background: "transparent",
            position: "relative",
            flex: 1,
            height: "100vh",
            pt: 4,
          }}
        >
          <img
            src="assets/Group 17.png"
            alt="decorations"
            style={{ position: "absolute", right: 0 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              color="#4ABCFE"
              fontSize="18px"
              onClick={() => router.push("/")}
            >
              AprendeEnLinea Profesores
            </Typography>
            <Box>
              <Button onClick={() => router.push("/addCourse")}>
                Crear cursos
              </Button>
              <Button onClick={() => firebase.logout()} variant="outlined">
                Cerrar sesión
              </Button>
            </Box>
          </Box>
          <Box>{children}</Box>
        </Container>
      </AuthLayout>
    </>
  );
};

export default TeacherLayout;
