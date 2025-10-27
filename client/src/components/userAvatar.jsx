import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import avatarimage from "../constants/avatar2.jpg";
export const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src={`${avatarimage}`} />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
};
