import http from "./httpService";
import URI from "urijs";

export function search(term) {
  const uri = new URI(`${process.env.REACT_APP_API_REST_ENDPOINT}/user/search`);
  if (term) uri.addSearch({ term });
  return http.get(uri.toString());
}
