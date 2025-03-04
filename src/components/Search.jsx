import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    console.log(null);
    setUsername("");
  };
  return (
    <Box className="w-full flex items-center flex-col">
      <Box className="searchForm flex justify-center w-4/5">
        <input
          type="text"
          placeholder="Find a user | try (karim)"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="bg-[#e0f1ff] px-2 py-1 border-none outline-none rounded-3xl w-full"
        />
      </Box>
      {err && <Typography component="span">User not found!</Typography>}
      {user && (
        <Box
          className="mt-5 cursor-pointer hover:bg-main w-full flex py-3 gap-3 items-center -mb-5 justify-center"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt=""
            className="w-8 aspect-square rounded-full"
          />
          <Box className="userChatInfo">
            <Typography component="span">{user.displayName}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Search;
