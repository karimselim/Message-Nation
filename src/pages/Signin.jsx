import { Form } from "../components";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import useMediaQuery from "../hooks/useMediaQuery";
import { useState } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      isDesktop ? navigate("/") : navigate("/chats");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return <Form onSubmit={handleSubmit} error={error} />;
};

export default Signin;
