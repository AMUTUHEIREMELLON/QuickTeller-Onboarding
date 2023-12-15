import axios from "axios";
import { baseUrl, iciUrl } from "./config";

const defaultHeaders = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };

  const NETWORK_TIMEOUT = 30000;

  
export const paypointAxios = axios.create({
    baseURL: baseUrl,
    timeout: NETWORK_TIMEOUT,
    headers: defaultHeaders,
  });

paypointAxios.interceptors.request.use((req) => {
    console.log("Paypoint Request: ", req)

    return req;
})

paypointAxios.interceptors.response.use((res) => {
    console.log("Paypoint Response: ", res)

    return res;
})


export const iciAxios = axios.create({
    baseURL: iciUrl,
    timeout: NETWORK_TIMEOUT,
    headers: defaultHeaders,
});

export const tokenICIAxios = axios.create({
    baseURL: iciUrl,
    timeout: NETWORK_TIMEOUT,
    headers: defaultHeaders,
});
