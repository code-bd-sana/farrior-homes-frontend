import type { ApiResponse } from "@/lib/api";
import axiosClient from "@/lib/axiosClient";

export type ChatParticipant = {
  _id: string;
  name?: string;
  email?: string;
  profileImage?: string;
  isOnline?: boolean;
  lastActiveAt?: string | null;
};

export type ChatProperty = {
  _id: string;
  propertyName?: string;
  address?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  thumbnail?: { key?: string; image?: string } | null;
};

export type ChatConversation = {
  _id: string;
  participants: ChatParticipant[];
  property: ChatProperty | null;
  lastMessage: string;
  lastMessageAt: string | null;
  unreadCount: number;
};

export type ChatMessage = {
  _id: string;
  conversationId: string;
  senderId: string;
  message: string;
  attachments: string[];
  status: "sent" | "delivered" | "seen";
  unsentForEveryone: boolean;
  forwardedFrom?: string | null;
  deletedFor?: string[];
  sender?: ChatParticipant;
  createdAt: string;
};

export type PaginatedChatMessages = {
  messages: ChatMessage[];
  nextCursor: string | null;
  count: number;
};

export const getChatConversations = async (): Promise<
  ApiResponse<ChatConversation[]>
> => {
  const res = await axiosClient.get<ApiResponse<ChatConversation[]>>(
    "/chat/conversations",
  );
  return res.data;
};

export const createChatConversation = async (payload: {
  participantIds: string[];
  propertyId?: string;
}): Promise<ApiResponse<ChatConversation>> => {
  const res = await axiosClient.post<ApiResponse<ChatConversation>>(
    "/chat/conversations",
    payload,
  );
  return res.data;
};

export const getChatMessages = async (params: {
  conversationId: string;
  cursor?: string;
  limit?: number;
}): Promise<ApiResponse<PaginatedChatMessages>> => {
  const res = await axiosClient.get<ApiResponse<PaginatedChatMessages>>(
    "/chat/messages",
    { params },
  );
  return res.data;
};

export const sendChatMessage = async (payload: {
  conversationId: string;
  message?: string;
  attachments?: string[];
}): Promise<ApiResponse<ChatMessage>> => {
  const res = await axiosClient.post<ApiResponse<ChatMessage>>(
    "/chat/messages",
    payload,
  );
  return res.data;
};

export const unsendChatMessage = async (
  messageId: string,
): Promise<ApiResponse<{ success: boolean }>> => {
  const res = await axiosClient.patch<ApiResponse<{ success: boolean }>>(
    `/chat/messages/${messageId}/unsend`,
  );
  return res.data;
};

export const deleteChatMessageForMe = async (
  messageId: string,
): Promise<ApiResponse<{ success: boolean }>> => {
  const res = await axiosClient.patch<ApiResponse<{ success: boolean }>>(
    `/chat/messages/${messageId}/delete-for-me`,
  );
  return res.data;
};

export const forwardChatMessage = async (
  messageId: string,
  targetConversationId: string,
): Promise<ApiResponse<ChatMessage>> => {
  const res = await axiosClient.post<ApiResponse<ChatMessage>>(
    `/chat/messages/${messageId}/forward`,
    { targetConversationId },
  );
  return res.data;
};

export const markChatSeen = async (
  conversationId: string,
): Promise<ApiResponse<{ modifiedCount: number }>> => {
  const res = await axiosClient.patch<ApiResponse<{ modifiedCount: number }>>(
    "/chat/messages/seen",
    { conversationId },
  );
  return res.data;
};

export const uploadChatFiles = async (
  files: File[],
): Promise<ApiResponse<{ urls: string[] }>> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const res = await axiosClient.post<ApiResponse<{ urls: string[] }>>(
    "/chat/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return res.data;
};
