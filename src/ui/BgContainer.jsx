import { Box } from "@mui/material";

const BgContainer = (props) => {
  return (
    <Box className="w-screen h-screen bg-landing bg-cover bg-center flex items-center justify-center top-0 left-0">
      <Box className="w-full h-full bg-black opacity-40 min-h-[100svh] min-w-[100svh] z-10 absolute" />
      {props.children}
    </Box>
  );
};

export default BgContainer;
