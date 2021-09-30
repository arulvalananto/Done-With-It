import storage from "../utility/storage";
import client from "./client";

const register = (userInfo) => client.post("/auth/register", userInfo);

const login = (credentials) => client.post("/auth/login", credentials);

const getCurrentUser = (token) =>
  client.get(
    "/auth/current-user",
    {},
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

const addFeed = async (feed, progress) => {
  const data = new FormData();
  data.append("title", feed.title);
  data.append("price", feed.price);
  data.append("category", feed.category.value);
  data.append("description", feed.description);
  feed.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    });
  });

  if (feed.location) {
    data.append("location", feed.location);
  }

  const token = await storage.getToken();

  return client.post("/feed/add", data, {
    headers: { "x-access-token": token },
    onUploadProgress: (prog) => progress(prog.loaded / prog.total),
  });
};

export default {
  register,
  login,
  getCurrentUser,
  addFeed,
};
