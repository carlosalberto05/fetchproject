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
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const checkFields = () => {
    return userName === "" || email === "" || check === false;
  };

  const isFieldsEmpty = checkFields();

  const handleValidate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
      const url = "https://frontend-take-home-service.fetch.com/auth";

      const body = {
        name: userName,
        email: email,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(url, options);
      console.log(response);

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const authResponse = await response.json();

      sessionStorage.setItem("fetchAccessToken", authResponse.fetchAccessToken);
      setLoading(false);
      setTimeout(() => {
        navigate("/inicio");
      });
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setAlert({
        show: true,
        message:
          "Hubo un error en la autenticación. Por favor, inténtalo de nuevo más tarde.",
        severity: "error",
      });
    }

    const data = {
      userName: userName,
      email: email,
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
              <label>Nombre de usuario</label>
              <input
                name="userName"
                className="input-style"
                type="text"
                onChange={handleChange}
                value={userName}
              />
              <label>Correo electrónico</label>
              <input
                name="email"
                className="input-style"
                type="email"
                onChange={handleChange}
                value={email}
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
                <CustomButton label="Iniciar sesión" disabled={isFieldsEmpty} />
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
