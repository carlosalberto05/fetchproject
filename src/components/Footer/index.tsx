import "./footer.css";
import FooterLogo from "../../assets/footer-logo.svg";

const social = [
  "Fetch para negocios",
  "Afiliaciones e influencers",
  "Centro de Ayuda",
  "Trabaja en Fetch",
  "Preguntas frecuentas de Fetch",
];

const info = [
  "Condiciones del Servicio",
  "Política de Privacidad",
  "Ley de Privacidad del Consumidor de California",
];

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo">
        <img className="footerlogo" src={FooterLogo} alt="footerlogo" />
      </div>
      <div className="social">
        {social.map((element: string, i: number) => {
          return (
            <a className="social-style" key={i}>
              {element}
            </a>
          );
        })}
      </div>
      <div className="info">
        {info.map((element: string, i: number) => {
          return (
            <a className="social-style" key={i}>
              {element}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
