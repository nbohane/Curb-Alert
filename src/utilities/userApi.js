import axios from "axios";
import { apiUrl } from "../../config";

const url = apiUrl + "/users";

export const login = async (email, password) => {
  return await axios.post(url + "/login", { email, password });
};

export const register = async (name, email, password, address, zipcode) => {
  let data = {
    name,
    email,
    password,
    default_address: address,
    default_zip: zipcode,
  };
  return await axios.post(url, data);
};

export const updateUser = async (id, data) => {
  return await axios.put(url + "/" + id, data);
};

export const deleteUser = async (id) => {
  return await axios.delete(url + "/" + id);
};
