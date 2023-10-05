import "./modal.css";
import { Backdrop } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import gifLoading from "../../assets/load-min.gif";
import { createTheme } from "@mui/material/styles";

interface IModalLoading {
  loading: boolean;
}

const themBackdrop = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          zIndex: 99999,
          backgroundColor: "rgba(0,0,0,0.6)",
        },
      },
    },
  },
});

export const ModalLoading = (props: IModalLoading) => {
  const { loading } = props;
  return (
    <ThemeProvider theme={themBackdrop}>
      <Backdrop open={loading}>
        <div className="containerLoading">
          <img
            src={gifLoading}
            alt="loagindGif"
            style={{ width: 100, display: "block", margin: 0 }}
          />
          <p className="textLoading">Cargando...</p>
        </div>
      </Backdrop>
    </ThemeProvider>
  );
};

export default ModalLoading;
