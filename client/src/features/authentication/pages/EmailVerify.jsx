import { useParams } from "react-router-dom";

export const EmailVerify = () => {
  const token = useParams().token;

  return <div className="mt-14">verify email with token: {token}</div>;
};
