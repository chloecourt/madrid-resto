import { useState } from "react";

export const getUserlocation = () => {
  // const [geolocation, setGeolocation] = useState(null);

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
  }
  // button text needs to be loading
  navigator.geolocation.getCurrentPosition(success, error);
};
