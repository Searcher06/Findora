export const Logo = ({ className = "", variant = "full" }) => {
  const src =
    variant === "icon" ? "/findoranavlogo.png" : "/iconplusfindoratext.png";

  return (
    <img
      src={src}
      alt="Findora"
      className={className}
    />
  );
};
