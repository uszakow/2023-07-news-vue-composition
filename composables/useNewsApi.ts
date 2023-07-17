import { api } from "@/api.config";
import { getHeaders } from "@/helpers/getHeaders";
import { NewsDto } from "interfaces/News.dto";
import { NewsInterface } from "interfaces/News.interface";
import { UpdateNewsDto } from "interfaces/UpdateNews.dto";

export const useNewsApi = () => {
  const createNewsApi = async (body: NewsDto, token: string): Promise<void> => {
    return await api("news", {
      method: "post",
      headers: getHeaders(token),
      body,
    });
  };

  const getNewsListApi = async (): Promise<NewsInterface[]> => {
    return await api<NewsInterface[]>("news");
  };

  const getNewsApi = async (newsId: string): Promise<NewsInterface> => {
    return await api<NewsInterface>(`news/${newsId}`);
  };

  const updateNewsApi = async (
    newsId: string,
    body: UpdateNewsDto,
    token: string
  ): Promise<void> => {
    return await api(`news/${newsId}`, {
      method: "put",
      headers: getHeaders(token),
      body,
    });
  };

  const deleteNewsApi = async (
    newsId: string,
    token: string
  ): Promise<void> => {
    return await api(`news/${newsId}`, {
      method: "delete",
      headers: getHeaders(token),
    });
  };

  return {
    createNewsApi,
    getNewsListApi,
    getNewsApi,
    updateNewsApi,
    deleteNewsApi,
  };
};
