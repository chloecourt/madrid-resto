import { useState, useContext } from "react";
import { ACTION_TYPES, AppContext } from "@/pages/_app";

const useGeolocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const appContext = useContext(AppContext);
  const dispatch = appContext?.dispatch;

  const success = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    if (dispatch) {
      dispatch({
        type: ACTION_TYPES.SET_LAT_LONG,
        payload: {
          latLong: `${latitude},${longitude}`,
          restaurants: [],
        },
      });
    }

    setLocationErrorMsg("");
    setIsLoadingLocation(false);
  };
  const error = () => {
    setIsLoadingLocation(false);
    setLocationErrorMsg(
      "Sorry this feature is unavailable right now, please try again later."
    );
  };

  const handleTrackLocation = () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("your location could not be found");
      setIsLoadingLocation(false);
    } else {
      // button text needs to be loading
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
    isLoadingLocation,
  };
};

export default useGeolocation;
