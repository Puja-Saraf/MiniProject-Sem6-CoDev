import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000/" });
export const api = {
  // login: (email, password) => API.post("/auth/login"),
  // signup: (email, password) => API.post("/auth/signup", { email, password }),
  getSelf: (params) => API.get("/users/user", { params }),
  updateUser: (newOb, params) =>
    API.put("/users/user", { formData: newOb }, { params }),
};
