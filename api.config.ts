export const api = $fetch.create({
  baseURL: "http://localhost:3052",
  onResponseError(context) {
    const { setUserState } = useAppState();

    // manage incorrect token
    if (context.response && context.response.status === 401) {
      localStorage.removeItem("token");
      setUserState();
    }
  },
});
