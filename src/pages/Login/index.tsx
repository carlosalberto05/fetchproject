import { ChangeEvent, useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import { IAlert } from "../../interfaces/alert";
import "./login.css";
import CustomButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert";
import ModalLoading from "../../components/ModalLoading";

const Login = () => {
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const checkFields = () => {
    return email === "" || password === "" || check === false;
  };

  const isFieldsEmpty = checkFields();

  const handleValidate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      return false;
    }
    return true;
  };

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!handleValidate()) {
      setAlert({
        show: true,
        message: "Verifica que el correo y la contraseña estén correctos",
        severity: "error",
      });
      setLoading(false);
      return;
    }

    try {
      //Llamada a la API de autenticación
      const url =
        "https://api.themoviedb.org/3/authentication/guest_session/new";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjg0MDIyMTUxNzJmZWE0Zjk2NTY2YWUwMTlmNmI1ZCIsInN1YiI6IjVkY2FlMmRjNDcwZWFkMDAxNTliNDJlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyQUaLyGm3nsagVVqkhs368oxNUNoQjpx4mGUoV_yos",
        },
      };
      const response = await fetch(url, options);
      const guesId = await response.json();
      sessionStorage.setItem("guestSessionId", guesId.guest_session_id);
      setLoading(false);
      setTimeout(() => {
        navigate("/inicio");
      });
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }

    const data = {
      email: email,
      password: password,
    };
    console.log(data);
  };

  return (
    <Layout>
      <>
        <ModalLoading loading={loading} />
        <Box className="container-login">
          <Typography variant="h4" color={"black"}>
            Login
          </Typography>
          <Typography variant="subtitle1" color={"black"}>
            ¡Bienvenido!
          </Typography>
          <br />
          <form onSubmit={handleOnSubmit}>
            <div className="containerForm">
              <label>Correo electrónico</label>
              <input
                name="email"
                className="input-style"
                type="email"
                onChange={handleChange}
                value={email}
              />
              <label>Contraseña</label>
              <input
                name="password"
                className="input-style"
                type="password"
                onChange={handleChange}
                value={password}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value={check}
                    onChange={(e) => setCheck(e.target.checked)}
                    checked={check}
                    sx={{
                      color: "rgba(217, 217, 217, 0.50)",
                      "&.Mui-checked": {
                        color: "rgba(217, 217, 217, 0.50)",
                      },
                    }}
                  />
                }
                label="He leido y acepto los terminos y condiciones"
              />

              <div className="container-button">
                <CustomButton label="Crear cuenta" disabled={isFieldsEmpty} />
              </div>
              <CustomAlert
                message={alert.message}
                severity={alert.severity}
                show={alert.show}
                onClose={() => {
                  setAlert({
                    show: false,
                    message: "",
                    severity: alert.severity,
                  });
                }}
              />
            </div>
          </form>
        </Box>
      </>
    </Layout>
  );
};

export default Login;
