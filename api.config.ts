export const api = $fetch.create({
  baseURL: "http://localhost:3052",
  onResponseError(context) {
    const { setUserContext } = useAppState();

    // manage incorrect token
    if (context.response && context.response.status === 401) {
      localStorage.removeItem("token");
      setUserContext();
    }
  },
});
