import {
  Button,
  Card,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineLeft, AiTwotoneHeart, AiOutlineMore } from "react-icons/ai";
import ReactPlayer from "react-player";
import { StyledTab } from "shared/UI/components/StyledTab";
import { StyledTabs } from "shared/UI/components/StyledTabs";
import { TabPanel } from "shared/UI/components/TabPanel";
import AuthLayout from "shared/UI/layouts/AuthLayout";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DetailCourse = () => {
  const router = useRouter();
  console.log(router.query.id);
  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
        >
          <AiOutlineLeft size={24} />
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{ background: "white", width: 24, mx: 0 }}
            variant="contained"
            color="inherit"
          >
            <AiTwotoneHeart color="#FC3636" size={24} />
          </Button>
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
          url="https://www.youtube.com/watch?v=IC2CYEurFX4"
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
          <Typography>Curso de programación web</Typography>
          <Box>
            <Typography>$99.45</Typography>
            <Typography>$99.45</Typography>
          </Box>
        </Box>
        <Box>
          <Typography>16 trazos • 2h 13m en total</Typography>
        </Box>
        <Box>
          <Card sx={{ display: "flex" }}>
            <Box>
              <Typography>$99.45</Typography>
              <Typography>$99.45</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography>$99.45</Typography>
              <Typography>$99.45</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box>
              <Typography>$99.45</Typography>
              <Typography>$99.45</Typography>
            </Box>
          </Card>
        </Box>
        <Box mt={10}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Workflows" {...a11yProps(0)} />
            <StyledTab label="Datasets" {...a11yProps(1)} />
            <StyledTab label="Connections" {...a11yProps(2)} />
          </StyledTabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <Box>o</Box>

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
        <Button
          sx={{ background: "white" }}
          variant="contained"
          color="inherit"
        >
          Añadir al carrito
        </Button>
        <Button sx={{}} variant="contained">
          Comprar
        </Button>
      </Box>
    </Container>
  );
};

export default DetailCourse;
