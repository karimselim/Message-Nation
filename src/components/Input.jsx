import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AddPhotoAlternate } from "@mui/icons-material";
import { Box } from "@mui/material";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <Box className="absolute bottom-0 w-full px-6 py-2 bg-second">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!data.user?.displayName}
        className="w-full py-3 rounded-2xl border-none outline-none px-3 bg-third"
      />
      <Box className="absolute right-8 bottom-2 flex gap-3 items-center">
        <AddPhotoAlternate className="text-5xl cursor-pointer text-main right-8 w-10" />
        <input
          type="file"
          className="absolute w-8 right-[131px] h-[42px] opacity-0 max-sm:right-[83px]"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-second py-2 rounded-2xl px-10 text-third max-sm:px-4"
          disabled={!data.user?.displayName}
          onClick={handleSend}
        >
          Send
        </button>
      </Box>
    </Box>
  );
};

export default Input;
