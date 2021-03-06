import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatedPost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const liking = (id) => API.patch(`/posts/${id}/liking`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
