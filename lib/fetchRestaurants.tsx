import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: `${process.env.UNSPLASH_ACCESS_KEY}`,
});

const getImgUrls = async () => {
  try {
    const photos = await unsplash.search.getPhotos({
      query: "restaurant",
      page: 1,
      perPage: 10,
    });

    const unsplashedResults = photos?.response?.results;
    return unsplashedResults!.map((data: any) => data.urls["small"]);
  } catch (e) {
    console.error(e);
  }
};

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

export const fetchRestaurants = async () => {
  const image = await getImgUrls();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY!,
    },
  };
  try {
    const response = await fetch(
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
    // destructured objects to create new object with specific key value pairs needed
    return results.map(
      (
        { location: { formatted_address, locality }, name, fsq_id }: any,
        index: number
      ) => {
        return {
          address: formatted_address,
          neighborhood: locality,
          name,
          id: fsq_id,
          imgUrl: image!.length > 0 ? image![index] : null,
        };
      }
    );
  } catch (e) {
    console.error(e);
  }
};
