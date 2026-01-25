import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import avatarimage from "../constants/avatar2.jpg";
import { useNavigate } from "react-router-dom";
export const UserAvatar = () => {
  const navigate = useNavigate();
  return (
    <Avatar
      onClick={() => {
        navigate("/profile");
      }}
    >
      <AvatarImage src={`${avatarimage}`} />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
};
