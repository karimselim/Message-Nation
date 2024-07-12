import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box } from "@mui/material";
import { useState } from "react";;

const PasswordInput = () => {
  const [visible, setVisible] = useState("password");
  const visibleHandler = () => {
    if (visible === "password") {
      setVisible("text");
    } else {
      setVisible("password");
    }
  };

  return (
    <Box className="relative w-full">
      <input
        type={visible}
        className="w-full py-3 mb-4 text-white border-b border-b-white outline-none bg-transparent"
        id="password"
      />
      <RemoveRedEyeIcon
        className="absolute right-3 top-[6px] text-white cursor-pointer"
        onClick={visibleHandler}
      />
    </Box>
  );
};

export default PasswordInput;
