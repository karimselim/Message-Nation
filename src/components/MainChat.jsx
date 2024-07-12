import { AppBar, Box, Typography } from "@mui/material";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
import { VideoCall, PersonAdd, MoreHoriz } from "@mui/icons-material";
import { Input, Messages } from "../components";
// import useMediaQuery from "../hooks/useMediaQuery";
// import { Messages, Sender } from "./";

const MainChat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div>
      <AppBar
        className="w-[calc(100%-384px)] max-md:w-[calc(100%-95px)] py-6 shadow-none border-l border-[#222] h-[72px] flex justify-between flex-row px-5"
        sx={{ backgroundColor: "#144272" }}
      >
        {" "}
        <Box className="flex gap-3">
          {data.user.photoURL && (
            <img
              src={data.user?.photoURL}
              alt=""
              className="w-8 rounded-full h-8"
            />
          )}
          <Typography variant="body1" color="initial">
            <span className="text-third">{data.user?.displayName}</span>
          </Typography>
        </Box>
        <Box className="flex gap-3 text-third cursor-not-allowed">
          <VideoCall />
          <PersonAdd />
          <MoreHoriz />
          {/* {!isDesktop && <div>karim sleim</div>} */}
        </Box>
      </AppBar>
      <Box className="absolute bottom-0 ml-[385px] max-md:ml-[95px] w-[-webkit-fill-available] h-[calc(100%-72px)]">
        <Messages />
        <Input />
      </Box>
    </div>
  );
};

export default MainChat;
