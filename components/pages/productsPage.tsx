import { Accordion, Box, Flex, Grid, GridItem, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { ITEMS_PER_PAGE } from '../../config/constants';
import { useProductContext } from '../../context/productsContext';
import { Button } from '../atoms/button';
import { ProductCard } from '../molecules/card';
import { FilterBox } from '../molecules/filterBox';
import { Header } from '../organisms/header';
import { Pagination } from '../organisms/pagination';
import { SortBy } from '../organisms/sortBy';

export const ProductsPage = () => {
    const { state } = useProductContext()
    console.log(state);
    return (<>
        {/* Header for product selection */}
        <Header productType={state?.productType}/>
        <Box p="8" paddingY="100px" height="full">
            <Grid
                templateAreas={`"header header" "nav main"`}
                gridTemplateRows={'50px 1fr 30px'}
                gridTemplateColumns={'1fr 4fr'}
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
                maxW="1400px"
                mx="auto"
            >
                {/* Header of product grid */}
                <GridItem pl='2' area={'header'} >
                    <Flex justify="space-between">
                        {!state?.isFetching && <>
                            Products Page ({state?.pagination.total})
                            <Pagination pageNo={state?.pageNo} setPageNo={state?.setPageNo} total={state?.pagination.total} />
                            <SortBy sortType={state?.sortType} setSortType={state?.setSortType as Dispatch<SetStateAction<string>>} />
                        </>}
                        {state?.isFetching && <>
                            {[...Array(3)].map((x, i) => <Skeleton key={i} height='50px' width="300px" />)}
                        </>}
                    </Flex>
                </GridItem>

                {/* Accordian of facets */}
                <GridItem pl='2' area={'nav'}>
                    <Button label={"Clear"} mx="auto" onClick={e => state?.setFacetFilters([])} />
                    <Accordion defaultIndex={[0]} allowMultiple w="full" gap={2}>
                        {!state?.isFetching && state?.facets.map((facet) =>
                            <FilterBox facet={facet} facetFilters={state?.facetFilters} setFacetFilters={state?.setFacetFilters} key={facet.identifier} />
                        )}
                        {state?.isFetching && <>
                            {[...Array(8)].map((x, i) => <Skeleton key={i} height='40px' width="full" mt="5px" />)}
                        </>}
                    </Accordion>
                </GridItem>

                {/* Grid of products */}
                <GridItem pl='2' area={'main'}>
                    <SimpleGrid minChildWidth='300px' spacing={10} p="10">
                        {!state?.isFetching && state?.products.map((prod) =>
                            <ProductCard product={prod} key={prod.id} />
                        )}
                        {state?.isFetching && <>
                            {[...Array(ITEMS_PER_PAGE)].map((x, i) => <Skeleton key={i} height='300px' />)}
                        </>}
                    </SimpleGrid>
                </GridItem>

            </Grid>
        </Box>
    </>
    )
}
