import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiTwotoneHeart, AiOutlineMore } from "react-icons/ai";
import ReactPlayer from "react-player";
import { useFirebase } from "react-redux-firebase";
import { StyledTab } from "shared/UI/components/StyledTab";
import { StyledTabs } from "shared/UI/components/StyledTabs";
import { TabPanel } from "shared/UI/components/TabPanel";
import PayUForm from "shared/forms/PayUForm";
import { useAppSelector } from "shared/redux/hooks";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DetailCourse = () => {
  const router: any = useRouter();
  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const firebase = useFirebase();
  const [data, setData] = useState<any>([]);
  const getData = async () => {
    firebase
      .firestore()
      .collection("cursos")
      .doc(router.query.id)
      .get()
      .then(async (doc) => {
        setData({
          ...doc.data(),
          uid: doc.id,
        });
      });
  };
  useEffect(() => {
    getData();
  }, [router.query.id]);

  const [urlvideo, setUrlvideo] = useState("");
  useEffect(() => {
    if (data?.capitulos?.length > 0)
      setUrlvideo(data?.capitulos[0].leccion[0]?.videoUrl);
  }, [data]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [expanded2, setExpanded2] = React.useState<string | false>(false);

  const handleChange2 =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded2(isExpanded ? panel : false);
    };
  const user = useAppSelector((state) => state.user);
  return (
    <Container
      sx={{
        background: "transparent",
        position: "relative",
        flex: 1,
        height: "100vh",
        pt: 4,
      }}
    >
      <Box
        display="flex"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Button
          sx={{ background: "white", width: 24, mx: 0 }}
          variant="contained"
          color="inherit"
          onClick={() => router.back()}
        >
          <AiOutlineLeft size={24} />
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{ background: "white", width: 24, mx: 0 }}
            variant="contained"
            color="inherit"
          >
            <AiOutlineMore size={24} />
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 4 }}>
        <ReactPlayer
          url={urlvideo}
          className="react-player"
          playing
          width="100%"
          controls
          height={mediaQuery ? "300px" : "500px"}
          style={{ borderRadius: "30px" }}
        />
      </Box>
      <Box>
        <Box>
          <Typography variant="h3" textAlign="center" color="primary">
            {data?.nombre}
          </Typography>
          <Typography variant="h6" mt={2} color="primary">
            Descripcion:
          </Typography>
          <Typography
            paragraph
            sx={{
              textAlign: "center",
              mt: 2,
            }}
          >
            {data?.descripcion}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              {data?.capitulos?.length} capitulos
            </Typography>
            <Typography variant="h6" color="primary">
              $ {data?.precio}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" mt={2} color="primary">
          Contenido:
        </Typography>
        <Box sx={{ pb: 20 }}>
          {data?.capitulos?.map((i: any, index: number) => (
            <>
              <Typography variant="h6" mt={2} color="primary">
                Capitulo {index + 1}:
              </Typography>
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange1(`panel${index}`)}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {i.titulo}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {i.subtitulo}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{i.descripcion}</Typography>
                </AccordionDetails>
              </Accordion>
              <Box px={2} py={1}>
                {i?.leccion?.map((i: any, index: number) => (
                  <>
                    <Typography variant="body1" mt={2} color="primary">
                      leccion {index + 1}:
                    </Typography>
                    <Accordion
                      expanded={expanded2 === `panel${index}`}
                      onChange={handleChange2(`panel${index}`)}
                      key={index}
                      disabled={
                        !(
                          data?.estudiantes?.includes(user.value?.email) ||
                          data?.emailCreator == user.value?.email
                        )
                      }
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          {i.nombre}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{i.descripcion}</Typography>
                        <ReactPlayer
                          url={i?.videoUrl}
                          className="react-player"
                          width="100%"
                          controls
                          height={mediaQuery ? "200px" : "500px"}
                          style={{ borderRadius: "30px" }}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </>
                ))}
              </Box>
            </>
          ))}
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: "4em",
            display: "flex",
            justifyContent: "space-evenly",
            left: 0,
            right: 0,
          }}
        >
          {user.isLogin ? (
            <PayUForm
              reference={`pagoC${data?.uid}${user.email}`}
              amount={data?.precio}
              email={user?.value?.email}
              description={data?.descripcion}
              idUser={undefined}
              idCase={undefined}
            />
          ) : (
            <>
            {!(
                          data?.estudiantes?.includes(user.value?.email) ||
                          data?.emailCreator == user.value?.email
                        ) &&
            <Button
              variant="contained"
              onClick={() => router.push("/register")}
              sx={{ px: 2 }}
              fullWidth
              >
              Comprar
            </Button>}
          </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default DetailCourse;
