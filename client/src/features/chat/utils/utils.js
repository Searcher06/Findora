// src/utils/utils.js or wherever your mockMessages are
export const CURRENT_USER_ID = "user_123";

export const mockMessages = [
  {
    id: 1,
    message:
      "Hi! I think you found my water bottle. I left it at the library yesterday.",
    senderId: CURRENT_USER_ID,
    senderName: "You", // Add senderName for current user
    timestamp: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    message: "Hey Alon! Yes, I found a blue one near the entrance. Is this it?",
    senderId: "user_456",
    senderName: "Alon",
    senderRole: "Finder",
    timestamp: "10:32 AM",
    avatar: "A",
  },
  {
    id: 3,
    message:
      "Yes, that's the one! Thank you so much for finding it. When would be a good time to pick it up?",
    senderId: "user_456",
    senderName: "Alon",
    senderRole: "Finder",
    timestamp: "10:33 AM",
    avatar: "A",
  },
  {
    id: 4,
    message: "I can come by anytime today after 3 PM. Would that work for you?",
    senderId: CURRENT_USER_ID,
    senderName: "You",
    timestamp: "10:35 AM",
    read: true,
  },
  {
    id: 5,
    message:
      "Perfect! 3 PM at the library cafe works great. I'll be wearing a red jacket.",
    senderId: "user_456",
    senderName: "Alon",
    senderRole: "Finder",
    timestamp: "10:36 AM",
    avatar: "A",
  },
  {
    id: 6,
    message: "Great, see you then! Thanks again for your help.",
    senderId: CURRENT_USER_ID,
    senderName: "You",
    timestamp: "10:37 AM",
    read: false,
  },
];
