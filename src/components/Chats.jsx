// import React, { useState } from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import LeftDrawer from "./LeftDrawer";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { Search } from "./";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      <LeftDrawer />
      <Box className=" relative h-screen w-72 bg-second ml-[96px] max-md:hidden">
        <Stack className="items-center py-5">
          <Search />
        </Stack>
        <Divider />
        <Box className=" text-third">
          {Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <Box
                className="userChat py-4 cursor-pointer hover:bg-main flex gap-3 px-4 items-center duration-300"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <img
                  src={chat[1].userInfo?.photoURL}
                  alt=""
                  className="w-8 aspect-square rounded-full"
                />
                <Box className="userChatInfo">
                  <Typography component="span">
                    {chat[1].userInfo?.displayName}
                  </Typography>
                  <Typography className="opacity-70">
                    {chat[1].lastMessage?.text}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Chats;
