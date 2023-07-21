import { Accordion, Flex, Grid, GridItem, SimpleGrid, Skeleton } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Button } from "../components/atoms/button"
import { ProductCard } from "../components/molecules/card"
import { FilterBox } from "../components/molecules/filterBox"
import { Header } from "../components/organisms/header"
import { Pagination } from "../components/organisms/pagination"
import { SortBy } from "../components/organisms/sortBy"
import { ITEMS_PER_PAGE, START_INDEX } from "../config/constants"
import { useProductContext } from "../context/productsContext"
import { Data, ProductTypes, SortTypes } from "../entities"
import { service } from "../services"

const Home = () => {
  //const { state } = useProductContext()
  const [productType, setProductType] = useState<ProductTypes>("toilets") // would have stored in context but ran out of time
  const [sortType, setSortType] = useState<SortTypes>("1") // would have stored in context but ran out of time
  const [pageNo, setPageNo] = useState<number>(START_INDEX) // would have stored in context but ran out of time
  const [facetFilters, setFacetFilters] = useState({}) // would have stored in context but ran out of time

  const {
    data,
    isFetching,
  } = useQuery(
    ["/products", productType, sortType, pageNo, facetFilters], //dependencies
    async () => {
      const data = await service.get.listing({
        query: productType,
        pageNumber: pageNo,
        size: ITEMS_PER_PAGE,
        additionalPages: 0,
        sort: parseInt(sortType),
        //facets: facetFilters
      })
      return data as Data
    },
    {
      onError: (error: any) => {
        alert("ERROR")
        console.log("ERROR", error)
      },
      refetchOnWindowFocus: false //no constant reloading
    }
  )

  //creates empty list based off the api data
  const createEmptyFacet = () => {
    if (data?.facets === undefined)
      return []
    return data?.facets.reduce((facetList, { identifier }) => {
      (facetList as any)[identifier] = []
      return facetList;
    }, {});
  }

  //reset page no if filter/sort/product changes
  useEffect(() => {
    setPageNo(START_INDEX)
  }, [productType, sortType])

  //initilaise facet filters
  useEffect(() => {
    setFacetFilters(createEmptyFacet())
  }, [data?.facets])

  return (
    <>
      {/* Header for product selection */}
      <Header productType={productType} setProductType={setProductType} />

      <Grid
        templateAreas={`"header header"
                  "nav main"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'200px 1fr'}
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
        maxW="1400px"
        mx="auto"
      >
        {/* Header of product grid */}
        <GridItem pl='2' area={'header'} >
          <Flex justify="space-between">
            Products Page
            <Pagination pageNo={pageNo} setPageNo={setPageNo} total={data?.pagination.total} />
            <SortBy sortType={sortType} setSortType={setSortType as Dispatch<SetStateAction<string>>} />
          </Flex>
        </GridItem>

        {/* Accordian of facets */}
        <GridItem pl='2' area={'nav'}>
          <Button label={"Clear"} mx="auto" onClick={e => setFacetFilters(createEmptyFacet())} />
          <Accordion defaultIndex={[0]} allowMultiple w="full" gap={2}>
            {data?.facets.map((facet) =>
              <FilterBox facet={facet} facetFilters={facetFilters} setFacetFilters={setFacetFilters} key={facet.identifier} />
            )}
          </Accordion>
        </GridItem>

        {/* Grid of products */}
        <GridItem pl='2' area={'main'}>
          <SimpleGrid minChildWidth='300px' spacing={10}>
            {!isFetching && data?.products.map((prod) =>
              <ProductCard product={prod} key={prod.id} />
            )}
            {isFetching && <>
              {[...Array(ITEMS_PER_PAGE)].map(x => <Skeleton height='300px' />)}
            </>}
          </SimpleGrid>
        </GridItem>

      </Grid>

    </>
  )
}

export default Home