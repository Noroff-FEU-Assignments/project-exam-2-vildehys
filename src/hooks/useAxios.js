import axios from "axios";

/**
 *
 * @param {object} auth Optional object provided using AuthContext
 * @returns Axios client with authorization headers, if any.
 */
export default function createAxios(auth) {
  const client = axios.create();
  if (auth) {
    client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth.accessToken}`;
  }

  return client;
}
