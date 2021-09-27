import client from "./client";

const login = (credentials) => client.post("/auth", credentials);

export default {
  login,
};
