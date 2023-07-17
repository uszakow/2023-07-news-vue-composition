import { api } from "@/api.config";
import { getHeaders } from "@/helpers/getHeaders";
import { CustomResponseInterface } from "interfaces/CustomResponse.interface";
import { UpdateUserDto } from "interfaces/UpdateUser.dto";
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
    return await api<UserInterface>("user", {
      headers: getHeaders(token),
    });
  };

  const updateUserApi = async (
    body: UpdateUserDto,
    token: string
  ): Promise<void> => {
    return await api("user", {
      method: "put",
      headers: getHeaders(token),
      body,
    });
  };

  const deleteUserApi = async (token: string): Promise<void> => {
    return await api("user", {
      method: "delete",
      headers: getHeaders(token),
    });
  };

  return {
    createUserApi,
    loginUserApi,
    getUserApi,
    updateUserApi,
    deleteUserApi,
  };
};
