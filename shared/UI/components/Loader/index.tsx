import { Backdrop } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useAppSelector } from "shared/redux/hooks";

const LoaderContainer = styled("div")`
  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`;

const Loader = ({ load = false }: { load?: boolean }) => {
  const loaderState = useAppSelector((state) => state.loading.value);
  const state = loaderState || load;
  return (
    <div style={{ display: state ? "block" : "none" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state}
      >
        <LoaderContainer>
          <div className="lds-hourglass" />
        </LoaderContainer>
      </Backdrop>
    </div>
  );
};

export default Loader;
