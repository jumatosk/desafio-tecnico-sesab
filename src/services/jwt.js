export const getToken = () => {
  if (!localStorage.getItem("token")) return null;
  return localStorage.getItem("token");
};
