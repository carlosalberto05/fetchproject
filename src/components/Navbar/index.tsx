import { AppBar, Box, Toolbar } from "@mui/material";
import Fetch from "../../assets/fetch.png";
// import imgUser from "../../assets/user.jpg";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = true;
  return (
    <Box>
      <AppBar position="static" style={{ backgroundColor: "#F5B9B2" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "3%",
          }}
        >
          <img
            src={Fetch}
            alt="logoDacodes"
            style={{ width: "172px" }}
            onClick={() => navigate("/")}
          />
          {auth && (
            <div>
              {/* <img src={imgUser} alt="user" style={{ width: "60%" }} /> */}
              <AccountCircleIcon />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
