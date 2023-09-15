import axios from "axios";

export default axios.create({
  baseURL: "https://spatialcitizen-server.vercel.app"
});
