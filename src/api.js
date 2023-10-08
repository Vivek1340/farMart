import axios from "axios";
const BASE_URL = "https://farmartapi-production.up.railway.app";

const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const signUp = async (email, password, name) => {
  try {
    const response = await api.post("/user/signup", { email, password, name });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await api.post("/user/signin", { email, password });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const uploadFile = async (formdata) => {
  try {
    const response = await api.post("/file/upload", formdata);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const viewFile = async (shortLink) => {
  try {
    const response = await api.get(`/file/view/${shortLink}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = async (id) => {
  try {
    const response = await api.delete(`/file/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllFiles = async () => {
  try {
    const response = await api.get("/file/getFiles");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
