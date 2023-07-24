import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useSelector, useDispatch } from "react-redux"
import { ITEMS_PER_PAGE, START_INDEX } from "../config/constants"
import { RootState } from "../config/redux/store"
import { setType } from "../config/redux/typeSlice"
import { AppState, Data, Facet, FacetFilter, Pagination, Product, ProductTypes, SortTypes } from "../entities"
import { service } from "../services"

const initialData: Data = {
    facets: [],
    products: [],
    pagination: {
        from: 0,
        size: 0,
        total: 0,
        sortType: 1
    },
}

const ProductsContext = createContext({} as IProductsContext)

const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const [sortType, setSortType] = useState<SortTypes>("1")
    const [pageNo, setPageNo] = useState<number>(START_INDEX)
    const [facetFilters, setFacetFilters] = useState<FacetFilter[]>([])
    const { productType } = useSelector((state: RootState) => state.productType);
    console.log(productType);

    const {
        data,
        isFetching,
    } = useQuery(
        ["/products", productType, sortType, pageNo, facetFilters], //dependencies
        async () => {
            const facets = createFacetJson()

            const data = await service.get.listing({
                query: productType,
                pageNumber: pageNo,
                size: ITEMS_PER_PAGE,
                additionalPages: 0,
                sort: parseInt(sortType),
                facets: facets
            })
            return data as Data
        },
        {
            onError: (error: any) => {
                alert("ERROR")
                console.log("ERROR", error)
            },
            initialData: initialData,
            refetchOnWindowFocus: false //no constant reloading
        }
    )

    //reset page no if filter/sort/product changes
    useEffect(() => {
        setPageNo(START_INDEX)
    }, [productType, sortType])

    //creates api call friendly facet filters
    const createFacetJson = () => {
        const value = facetFilters.reduce((facetList, { type, identifier, value }) => {
            if ((facetList as any)[type] === undefined) {
                (facetList as any)[type] = [{ identifier, value }]
            } else {
                (facetList as any)[type] = [...(facetList as any)[type], { identifier, value }]
            }
            return facetList;
        }, {});
        return value;
    }

    return (
        <ProductsContext.Provider
            value={{
                state: {
                    facets: data?.facets!,
                    products: data?.products!,
                    pagination: data?.pagination!,
                    productType,
                    sortType,
                    setSortType,
                    pageNo,
                    setPageNo,
                    facetFilters,
                    setFacetFilters,
                    isFetching,
                },
                methods: {
                    createFacetJson
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
        sortType: SortTypes
        setSortType: Dispatch<SetStateAction<SortTypes>>
        pageNo: number
        setPageNo: Dispatch<SetStateAction<number>>
        facetFilters: any
        setFacetFilters: Dispatch<SetStateAction<any>>
    },
    methods: {
        createFacetJson: () => {}
    }
}