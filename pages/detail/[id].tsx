import {
  Button,
  Card,
  Container,
  Divider,
  styled,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineLeft, AiTwotoneHeart, AiOutlineMore } from "react-icons/ai";
import ReactPlayer from "react-player";
import AuthLayout from "shared/UI/layouts/AuthLayout";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "684BDD",
  "&.Mui-selected": {
    color: "#684BDD",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
    </AuthLayout>
  );
};

export default DetailCourse;
