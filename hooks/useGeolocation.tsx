import { useState } from "react";

const useGeolocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");

  const success = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // success function
  };
  const error = () => {
    alert(
      "Sorry this feature is unavailable right now, please try again later."
    );
  };

  if (!navigator.geolocation) {
    // change button text to say unable to retrieve your location
  } else {
    // button text needs to be loading
    navigator.geolocation.getCurrentPosition(success, error);
  }

  const handleFindGeolocation = () => {
    //
  };
};

export default useGeolocation;

export const getUserlocation = () => {
  // const [geolocation, setGeolocation] = useState(null);
};
