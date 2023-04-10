import axios from "axios";

const apiUrl =
  "https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/106";

export const fetchData = () => {
  return axios
    .get(apiUrl)
    .then((response) => response)
    .catch((error) => console.error(error));
};
