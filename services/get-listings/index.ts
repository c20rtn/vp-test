import { api } from '../../config/api'

export const getListings = async ({
    query,
    pageNumber,
    size,
    additionalPages,
    sort,
    facets
}: Params) => {

    //access secret api key for security
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    //can access HTTP verbs through the api object methods
    const { data } = await api.post(
        `interviews/listings?apikey=${apiKey}`,
        {
            query,
            pageNumber,
            size,
            additionalPages,
            sort,
            facets
        }
    )
    return data;
}

interface Params {
    query: string
    pageNumber: number
    size: number
    additionalPages: number
    sort: number
    facets?: {}
}
