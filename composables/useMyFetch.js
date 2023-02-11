import { useFetch } from "#app";
// const BASE_URL = "https://express-back.onrender.com";
const BASE_URL = "https://lazy-tan-rooster-cap.cyclic.app";
const HEADERS = {
  "Access-Control-Allow-Origin": "*",
};

export const useMyFetch = async function (_endpoint, _payload) {
  const URL = `${BASE_URL}${_endpoint}`;
  let { headers } = _payload;
  headers = { ...headers, ...HEADERS };
  const { data, error } = await useFetch(URL, {
    ..._payload,
    headers,
  });
  return { data, error };
};
