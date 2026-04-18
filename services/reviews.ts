import axiosClient from "@/lib/axiosClient";

export interface ReviewVideoItem {
  key: string;
  fileName: string;
  url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getReviewVideos(): Promise<ReviewVideoItem[]> {
  const response =
    await axiosClient.get<ApiResponse<ReviewVideoItem[]>>("/reviews/videos");
  return response.data.data;
}
