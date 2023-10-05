import { AlertColor } from "@mui/material";

export interface IAlert {
  show: boolean;
  message: string | React.ReactChild;
  severity: AlertColor;
}
