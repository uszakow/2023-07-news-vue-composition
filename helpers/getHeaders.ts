export const getHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});
