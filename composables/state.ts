import { UserInterface } from "interfaces/User.interface";
import { useUserApi } from "@/composables/useUserApi";

// const { getUserApi } = useUserApi();

export const useAppState = () => {
  const { getUserApi } = useUserApi();

  const isLoading = useState<boolean>("isLoading", () => true);
  const token = useState<string | null>("token", () => null);
  const user = useState<UserInterface | null>("user", () => null);

  const setIsLoading = (isLoadingValue: boolean): void => {
    isLoading.value = isLoadingValue;
  };

  const setUserContext = async (): Promise<void> => {
    isLoading.value = true;
    const tokenValue = localStorage.getItem("token");

    if (tokenValue) {
      try {
        const userValue = await getUserApi(tokenValue);

        token.value = tokenValue;
        user.value = userValue;
      } catch (error) {}
    } else {
      token.value = null;
      user.value = null;
    }

    isLoading.value = false;
  };

  return {
    isLoading,
    setIsLoading,
    token,
    user,
    setUserContext,
  };
};

// export const useIsLoading = () => useState<boolean>("isLoading", () => true);
// export const useToken = () => useState<string | null>("token", () => null);
// export const useUser = () => useState<UserInterface | null>("user", () => null);

// export const useManageUser = async () => {
//   const isLoading = useIsLoading();
//   const token = useToken();
//   const user = useUser();

//   isLoading.value = true;
//   const tokenValue = localStorage.getItem("token");

//   if (tokenValue) {
//     try {
//       const userValue = await getUserApi(tokenValue);

//       token.value = tokenValue;
//       user.value = userValue;
//     } catch (error) {}
//   } else {
//     token.value = null;
//     user.value = null;
//   }

//   isLoading.value = false;
// };
