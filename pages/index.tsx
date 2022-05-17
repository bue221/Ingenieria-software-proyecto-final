import React from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import styles from "../styles/Home.module.css";
import { useAppSelector } from "shared/redux/hooks";
import MainTeacherView from "shared/pages/MainTeacherView";
import { StyledTab } from "shared/UI/components/StyledTab";
import { StyledTabs } from "shared/UI/components/StyledTabs";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { TabPanel } from "shared/UI/components/TabPanel";
import CardCourse from "shared/UI/components/CardCourse";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home: NextPage = () => {
  const user = useAppSelector((state) => state.user);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      {user.value?.rol === "PROFESOR" ? (
        <MainTeacherView />
      ) : (
        <>
          <Container sx={{ position: "relative" }}>
            <img
              src="assets/Group 17.png"
              alt="decorations"
              style={{ position: "absolute", right: 0, top: 0 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography
                color="#4ABCFE"
                fontSize="18px"
                onClick={() => router.push("/")}
              >
                AprendeEnLinea
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button onClick={() => router.push("/login")}>
                  Iniciar sesión
                </Button>
              </Box>
            </Box>
            <form>
              <Box mt={10}>
                <Typography color="#151143" fontSize="16px">
                  Bienvenid@ vamos a aprender 👋
                </Typography>
                <Typography fontWeight="bold" color="#151143" fontSize="24px">
                  Explora y busca nuevos cursos.
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    variant="outlined"
                    placeholder="Buscar ..."
                    fullWidth
                    sx={{ my: 6 }}
                  />
                  <Box>
                    <IconButton color="secondary">
                      <ManageSearchIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                  >
                    <StyledTab label="Nuevos" {...a11yProps(0)} />
                    <StyledTab label="Recomendados" {...a11yProps(1)} />
                    <StyledTab label="Tecnología" {...a11yProps(2)} />
                  </StyledTabs>
                  <TabPanel value={value} index={0}>
                    <div
                      style={{
                        display: "flex",
                        overflowX: "scroll",
                        width: "100%",
                        gap: 10,
                      }}
                    >
                      <CardCourse />
                      <CardCourse />
                      <CardCourse />
                      <CardCourse />
                      <CardCourse />
                      <CardCourse />
                      <CardCourse />
                      <CardCourse />
                      <CardCourse />
                      <CardCourse />
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                </Box>
              </Box>
            </form>
          </Container>
        </>
      )}
    </div>
  );
};

export default Home;
