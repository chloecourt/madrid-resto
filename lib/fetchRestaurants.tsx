import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: `${process.env.UNSPLASH_ACCESS_KEY}`,
});

type GetUrlForRestaurantsParams = {
  latLong: string;
  query: string;
  limit: number;
};
const getUrlForRestaurants = ({
  latLong,
  query,
  limit,
}: GetUrlForRestaurantsParams) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};
const getImgUrls = async () => {
  try {
    const photos = await unsplash.search.getPhotos({
      query: "restaurant",
      perPage: 30,
    });
    console.log({ photos });
    const unsplashedResults = photos?.response?.results;
    if (!unsplashedResults) {
      throw Error("photo api images did not load");
    }
    return unsplashedResults!.map((data: any) => data.urls["small"]);
  } catch (e) {
    console.error(e);
  }
};

export const fetchRestaurants = async (
  latLong = "40.422881%2C-3.685774",
  limit = 6
) => {
  const image = await getImgUrls();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY!,
    },
  };

  const response = await fetch(
    getUrlForRestaurants({ latLong, query: "restaurants", limit: 6 }),
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
};
