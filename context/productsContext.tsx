import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { useQuery } from "react-query"
import { START_INDEX, ITEMS_PER_PAGE } from "../config/constants"
import { Data, Facet, Pagination, Product, ProductTypes, SortTypes } from "../entities"
import { service } from "../services"

const ProductsContext = createContext({} as IProductsContext)

const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const [productType, setProductType] = useState<ProductTypes>("toilets")
    const [sortType, setSortType] = useState<SortTypes>("1")
    const [pageNo, setPageNo] = useState<number>(START_INDEX)
    const [facetFilters, setFacetFilters] = useState([]) //Started and couldnt get them going in time

    const {
        data,
        isFetching,
    } = useQuery(
        ["/products", productType, sortType, pageNo],
        async () => {
            const data = await service.get.listing({
                query: productType,
                pageNumber: pageNo,
                size: ITEMS_PER_PAGE,
                additionalPages: 0,
                sort: parseInt(sortType)
            })
            return data as Data
        },
        {
            onError: (error: any) => {
                alert("ERROR")
                console.log("ERROR", error)
            },
            refetchOnWindowFocus: false
        }
    )

    // useEffect(() => {
    //   const newFacets = data?.facets.reduce((facetList, { identifier, options }) => {
    //     (facetList as any)[identifier] = options.map(op => {
    //       return ({
    //         identifier: op.identifier,
    //         value: op.value,
    //       })
    //     });
    //     return facetList;
    //   }, {});
    //   console.log(newFacets);
    // }, [data?.facets])

    return (
        <ProductsContext.Provider
            value={{
                state: {
                    facets: data?.facets!,
                    products: data?.products!,
                    pagination: data?.pagination!,
                    productType,
                    setProductType,
                    sortType,
                    setSortType,
                    pageNo,
                    setPageNo,
                    facetFilters,
                    setFacetFilters,
                    isFetching,
                },
                methods: {

                }
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

const useProductContext = () => {
    return useContext(ProductsContext)
}

export { useProductContext, ProductsProvider }

interface IProductsContext {
    state: {
        facets: Facet[]
        products: Product[]
        pagination: Pagination
        isFetching: boolean
        productType: ProductTypes
        setProductType: Dispatch<SetStateAction<ProductTypes>>
        sortType: SortTypes
        setSortType: Dispatch<SetStateAction<SortTypes>>
        pageNo: number
        setPageNo: Dispatch<SetStateAction<number>>
        facetFilters: any
        setFacetFilters: Dispatch<SetStateAction<any>>
    },
    methods: {

    }
}