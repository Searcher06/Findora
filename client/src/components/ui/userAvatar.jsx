import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
export const userAvatar = () => {
  return (
    <Avatar>
      <AvatarImage />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
};
