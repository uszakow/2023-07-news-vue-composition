import { api } from "@/api.config";
import { UserDto } from "interfaces/User.dto";

export const useUserApi = () => {
  const loginUserApi = async (body: UserDto): Promise<string> => {
    const response = await api<{ token: string }>("/user/login", {
      method: "post",
      body,
    })

    return response.token;
  };

  return {
    loginUserApi,
  };
};
