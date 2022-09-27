import axios from "axios";
import { apiUrl } from "../../config";

const url = apiUrl + "/listings";

export const getFeed = async (zip, page = 1) => {
  return axios.get(url + `/feed/${zip}/${page}`);
};

export const createListing = async (listing) => {
  console.log(listing);
  return axios.post(url, listing);
};

export const updateListing = async (id, data) => {
  return await axios.put(url + "/" + id, data);
};

export const deleteListing = async (id) => {
  return await axios.delete(url + "/" + id);
};
