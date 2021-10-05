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

const addFeed = async (feed) => {
  console.log(feed.description);
  const data = new FormData();
  data.append("title", feed.title);
  data.append("price", feed.price);
  data.append("category", feed.category.value);
  data.append("description", feed.description);
  data.append("latitude", feed.location.latitude);
  data.append("longitude", feed.location.longitude);
  feed.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    });
  });

  const token = await storage.getToken();

  return client.post("/feed/add", data, {
    headers: { "x-access-token": token },
  });
};

const retrieveFeeds = async () => {
  const token = await storage.getToken();
  if (!token) return Error("unauthorized");

  return client.get(
    "/feed/retrieve-all",
    {},
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};

export default {
  register,
  login,
  getCurrentUser,
  addFeed,
  retrieveFeeds,
};
