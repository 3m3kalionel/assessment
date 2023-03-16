import { BASE_URL } from "./constants";
import { searchResultsType } from "./types";

export const fetchData = (
  searchString: string,
  callback: React.Dispatch<React.SetStateAction<searchResultsType[]>>
) => {
  const params: Record<string, string> = {
    action: "query",
    list: "search",
    srsearch: searchString,
    format: "json"
  };

  let url = BASE_URL + "?origin=*";
  Object.keys(params).forEach(function (key: string) {
    url += "&" + key + "=" + params[key];
  });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function ({ query: { search } }) {
      callback(search);
    })
    .catch(function (error) {
      console.log(error);
    });
};
