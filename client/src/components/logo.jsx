import logo from "../assets/logo.svg";
export const Logo = ({ className }) => {
  return <img src={logo} alt="Logo" className={`${className}`} />;
};
