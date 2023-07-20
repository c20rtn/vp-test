import { getListings } from "./get-listings";

//create a service directory for further use
export const service = {
    get: {
        listing: getListings,
    }
}