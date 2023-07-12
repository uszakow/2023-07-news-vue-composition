import { api } from "@/api.config";
import { getRequestOptions } from "@/helpers/getRequestOptions";
import { CustomResponseInterface } from "interfaces/CustomResponse.interface";
import { UserDto } from "interfaces/User.dto";
import { UserInterface } from "interfaces/User.interface";

export const useUserApi = () => {
  const createUserApi = async (
    body: UserDto
  ): Promise<CustomResponseInterface> => {
    return await api<CustomResponseInterface>("user", {
      method: "post",
      body,
    });
  };

  const loginUserApi = async (body: UserDto): Promise<string> => {
    const response = await api<{ token: string }>("user/login", {
      method: "post",
      body,
    });

    return response.token;
  };

  const getUserApi = async (token: string): Promise<UserInterface> => {
    const response = await api<UserInterface>("user", {
      headers: getRequestOptions(token),
    });

    return response;
  };

  const updateUserApi = async () => {};

  const deleteUserApi = async (token: string) => {};

  return {
    createUserApi,
    loginUserApi,
    getUserApi,
    updateUserApi,
    deleteUserApi,
  };
};
