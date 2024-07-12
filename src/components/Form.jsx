import { BgContainer, PasswordInput } from "../ui";
import { Button, Input, Typography, Box } from "@mui/material";
import classes from "../css/Button.module.css";
import { Link, useLocation } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Form = ({ onSubmit, error, loading }) => {
  const location = useLocation();

  return (
    <BgContainer>
      <Box className="z-20 top-1/2 left-1/2 w-96 p-10 bg-black bg-opacity-50 rounded-xl shadow-xl">
        <Typography
          variant="h5"
          color="initial"
          className="text-white mb-8 text-center"
        >
          {location.pathname.includes("login") ? "Login" : "Signup"}
        </Typography>
        <form onSubmit={onSubmit} id="form">
          {location.pathname.includes("signup") && (
            <>
              <Typography
                className="pointer-events-none transition-none text-prime"
                component="label"
              >
                Username
              </Typography>
              <input
                type="text"
                className="w-full py-3 mb-6 border-b text-white border-b-white outline-none bg-transparent"
                id="username"
              />
            </>
          )}
          <Typography
            className="pointer-events-none transition-none text-prime"
            component="label"
          >
            Email
          </Typography>
          <input
            type="text"
            className="w-full py-3 mb-6 border-b text-white border-b-white outline-none bg-transparent"
            id="email"
          />
          <Typography
            className="text-prime pointer-events-none transition-none"
            component="label"
          >
            Password
          </Typography>
          <PasswordInput />
          {location.pathname.includes("signup") && (
            <Box className="flex justify-between items-center mb-6 mt-2">
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                id="pic"
                className="text-prime border-prime hover:border-prime hover:bg-prime hover:text-white"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <Input
                  className="hidden"
                  type="file"
                  id="pic"
                  accept="image/*"
                />
              </Button>
              <Typography
                className="pointer-events-none transition-none text-prime"
                component="label"
                id="pic"
              >
                Choose avatar
              </Typography>
            </Box>
          )}
          {error && (
            <Typography className="text-red-600 mb-2">{error}</Typography>
          )}
          {loading && (
            <Typography className="text-prime mb-2">loading...</Typography>
          )}
          <Typography variant="p" className="text-white text-sm block">
            Don't have an account{" "}
            {location.pathname.includes("login") ? (
              <Link to="/signup" className="text-blue-600 underline">
                register
              </Link>
            ) : (
              <Link to="/login" className="text-blue-600 underline">
                Login
              </Link>
            )}
          </Typography>
          <button className={classes.button}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </Box>
    </BgContainer>
  );
};

export default Form;
