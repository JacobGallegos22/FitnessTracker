import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:5001/api/",
  responseType: "json",
  headers: {
    'Content-Type': 'application/json',
    'Accept' : '*/*'
  }
});
