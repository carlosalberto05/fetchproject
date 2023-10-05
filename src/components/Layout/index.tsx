import { Container } from "@mui/material";
import Navbar from "../Navbar";
import Footer from "../Footer";

type Props = {
  children?: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <Container
        style={{
          maxWidth: "200vh",
          flex: 1,
          minHeight: "55vh",
        }}
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
