import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const result = await Location.requestForegroundPermissionsAsync();
      if (!result.granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLocation();
  });

  return location;
};
