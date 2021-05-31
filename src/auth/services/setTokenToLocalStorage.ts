export default function setTokenToLocalStorage(token: string) {
  if (token) {
    localStorage.setItem("token", token);
  }
}
