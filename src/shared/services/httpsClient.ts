import axios from "axios";
import firebase from "firebase";
import queryString from "query-string";

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();

  // // Not logged in
  // const hasRememberedAccount = localStorage.getItem(
  //   "firebaseui::rememberedAccounts"
  // );
  // if (!hasRememberedAccount) return null;

  // Logged in but current user is not fetched --> wait (10s)
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
      console.log("Reject timeout");
    }, 10000);

    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user: any) => {
        if (!user) {
          reject(null);
        }

        const token = await user.getIdToken();
        console.log("[AXIOS] Logged in user token: ", token);
        resolve(token);

        unregisterAuthObserver();
        clearTimeout(waitTimer);
      });
  });
};

const httpsClient = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_API,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

httpsClient.interceptors.request.use(async (config) => {
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpsClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export default httpsClient;
