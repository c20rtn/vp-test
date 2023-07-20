import axios from "axios";

//use a base url so that other services can be easily maintained and created
export const api = axios.create({
    baseURL: "https://spanishinquisition.victorianplumbing.co.uk/"
})