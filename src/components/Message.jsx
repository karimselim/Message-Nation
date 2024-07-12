import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Box, Typography } from "@mui/material";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Box
      ref={ref}
      className={`flex gap-3 mb-5 items-center ${
        message.senderId === currentUser.uid && "flex-row-reverse"
      } text-third`}
    >
      <Box className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="w-8 rounded-full aspect-square"
        />
        <span className="opacity-30">
          {new Date(message.date.seconds * 1000).toISOString().slice(11, 16)}
        </span>
      </Box>
      <Box
        className={`h-fit px-2 rounded-xl bg-second py-1 ${
          message.senderId === currentUser.uid
            ? "rounded-tr-none"
            : "rounded-tl-none"
        }`}
      >
        <Typography>{message.text}</Typography>
        {message.img && (
          <img src={message?.img} alt="" className="rounded-xl " />
        )}
      </Box>
    </Box>
  );
};

export default Message;
