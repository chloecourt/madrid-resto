import { useState } from "react";

const useGeolocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const success = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg("");
  };
  const error = () => {
    setLocationErrorMsg(
      "Sorry this feature is unavailable right now, please try again later."
    );
  };

  const handleTrackLocation = () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("your location could not be found");
    } else {
      // button text needs to be loading
      navigator.geolocation.getCurrentPosition(success, error);
    }
    setIsLoadingLocation(false);
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
    isLoadingLocation,
  };
};

export default useGeolocation;

export const getUserlocation = () => {
  // const [geolocation, setGeolocation] = useState(null);
};
