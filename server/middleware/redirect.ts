export default defineEventHandler((event) => {
  const urlObj = getRequestURL(event);

  if (urlObj.pathname === "/news" || urlObj.pathname === "/news/") {
    sendRedirect(event, "/");
  }
});
