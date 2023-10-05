import React from "react";
import { AlertColor, Alert } from "@mui/material";
import "./alert.css";
import warningRedAssets from "../../assets/icono-advertencia-rojo.png";
import DoneIcon from "@mui/icons-material/Done";

interface ICustomAlert {
  show: boolean;
  severity: AlertColor;
  message: string | React.ReactChild;
  onClose?: () => void;
  children?: JSX.Element;
}

const CustomAlert = (props: ICustomAlert) => {
  const { show, severity, message, onClose, children } = props;

  const getColorBackground = (): string => {
    let color = "";
    switch (severity) {
      case "warning":
        color = "#FAE295";
        break;
      case "info":
        color = "#EEFAFA";
        break;
      case "error":
        color = "#FFE2E5";
        break;
      case "success":
        color = "#D0F0C9";
        break;
      default:
        break;
    }
    return color;
  };

  const getColorLabel = (): string => {
    let color = "";
    switch (severity) {
      case "warning":
        color = "#E35700";
        break;
      case "info":
        color = "#293990";
        break;
      case "error":
        color = "#D1001F";
        break;
      case "success":
        color = "#3ABE21";
        break;
      default:
        break;
    }
    return color;
  };

  return (
    <Alert
      style={{
        borderRadius: "6px",
        display: show ? "flex" : "none",
        boxSizing: "border-box",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: getColorBackground(),
        color: getColorLabel(),
      }}
      className="alertIcon"
      onClose={severity === "error" ? onClose : undefined}
      severity={severity}
      sx={{ width: "35%" }}
      icon={
        severity === "success" ? (
          <DoneIcon />
        ) : (
          <img src={warningRedAssets} className="sizeIcon" alt="close" />
        )
      }
    >
      {children !== undefined && children}
      {children === undefined && <span>{message}</span>}
    </Alert>
  );
};

export default CustomAlert;
