type getFourSquareUrlObject = {
  // latLong?: string;
  limit: number;
  city?: string;
  country?: string;
  sort: string;
  query: string;
};
export const getFourSquareUrl = ({
  // latLong,
  limit,
  query,
  city,
  country,
  sort = "RELEVANCE",
}: getFourSquareUrlObject) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&near=${city}%2C%20${country}&sort=${sort}&limit=${limit}`;
};

getFourSquareUrl({
  limit: 10,
  query: "restaurants",
  city: "Madrid",
  country: "Spain",
  sort: "RELEVANCE",
});

export const fetchRestaurants = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY!,
    },
  };
  try {
    const response = await fetch(
      // "https://api.foursquare.com/v3/places/search?query=restaurants&near=Madrid%2C%20Spain&sort=RELEVANCE&limit=10",
      getFourSquareUrl({
        limit: 10,
        query: "restaurants",
        city: "Madrid",
        country: "Spain",
        sort: "RELEVANCE",
      }),
      options
    );
    const fourSquareData = await response.json();
    const { results } = fourSquareData;

    if (!results) {
      throw console.error();
    }
    return results;
  } catch (e) {
    console.error(e);
  }
};
