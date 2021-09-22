const { create } = require("apisauce");

const apiClient = create({
  baseURL: "192.168.0.14:9000/api",
});

export default apiClient;
