import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import {
  Message,
  Call,
  Person,
  Notifications,
  Settings,
  Logout,
} from "@mui/icons-material";
import { Drawer, List, ListItem, Toolbar } from "@mui/material";

const LeftDrawer = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: "#0a2647",
          alignItems: "center",
          zIndex: "20",
          width: "6rem",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar className="bg-second w-full h-[100px]">
        <img
          src={currentUser?.photoURL}
          alt=""
          className="rounded-full w-12 aspect-square object-cover"
        />
      </Toolbar>
      <List className="h-full w-full pt-0">
        <ListItem className="flex justify-center hover:bg-second hover:cursor-pointer duration-300">
          <Message className="text-third my-2" />
        </ListItem>
        <ListItem className="flex justify-center hover:bg-second hover:cursor-pointer my-2 duration-300">
          <Call className="text-third my-2" />
        </ListItem>
        <ListItem className="flex justify-center hover:bg-second hover:cursor-pointer duration-300">
          <Person className="text-third mb-4 my-2" />
        </ListItem>
        <ListItem className="flex justify-center hover:bg-second hover:cursor-pointer duration-300">
          <Notifications className="text-third mb-4 my-2" />
        </ListItem>
      </List>
      <List className="mt-auto w-full pb-0">
        <ListItem className="flex justify-center hover:bg-second hover:cursor-pointer duration-300">
          <Settings className="text-third mb-4" />
        </ListItem>
        <ListItem
          className="flex justify-center hover:bg-second hover:cursor-pointer duration-300"
          onClick={() => signOut(auth)}
        >
          <Logout className="text-third mb-4" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
