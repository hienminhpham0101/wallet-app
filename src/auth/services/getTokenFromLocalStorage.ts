export default function getTokenFromLocalStorage() {
  const token = localStorage.getItem("token");
  return token;
}
