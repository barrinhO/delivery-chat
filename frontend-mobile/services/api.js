import axios from "axios";

export const API_URL = "http://26.105.105.149:3000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default {
  login: (email, password) =>
    api.post("/login", { email, password }).then((r) => r.data),
  register: (name, email, password, role) =>
    api.post("/register", { name, email, password, role }).then((r) => r.data),
  fetchUsers: (role) => api.get(`/users?role=${role}`).then((r) => r.data),
};
