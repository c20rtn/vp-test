import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react'
import { Product } from '../../entities'
import { colors } from '../../styles/colors'

interface Props {
    product: Product,
}

export const ProductCard = ({ product }: Props) => {
    return (
        <Box
            maxW='sm'
            minW="300px"
            mx={4}
            borderWidth='0px'
            borderColor={colors.primary}
            overflow='hidden'
            shadow="md"
            cursor="pointer"
            borderBottomRightRadius="50px"
            transition="box-shadow 0.1s linear"
            _hover={{ "shadow": "2xl" }}
            bg="white"
        >
            <Image shadow="md" w="full" maxH="300" objectFit="fill" src={product.image.url} alt={product.image.url} />

            <Box p='6' h="full">
                <Box display='flex' alignItems='baseline'>
                    {product.attributes.isRecommended && <Badge borderRadius='full' px='2' colorScheme='green'>
                        Recommended!
                    </Badge>}
                    {product.attributes.isBestSeller && <Badge borderRadius='full' px='2' colorScheme='teal'>
                        Best Seller!
                    </Badge>}
                    {product.attributes.isNew && <Badge borderRadius='full' px='2' colorScheme='red'>
                        New!
                    </Badge>}
                </Box>

                <Box
                    mt='1'
                    fontWeight="medium"
                    lineHeight='tight'
                    fontSize="lg"
                >
                    {product.productName}
                </Box>

                <Box color="red.500" fontWeight="bold" fontSize="2xl">
                    £{product.price.priceIncTax}
                    {product.price.isOnPromotion &&
                        <Text color="gray.500" fontWeight="medium" fontSize="md">{`(Was £${product.price.wasPriceIncTax})`}</Text>}
                </Box>

                <Flex justify="space-between">
                    <Box>{product.reviewsCount} reviews</Box>
                    <Box color={product.stockStatus.status === "G" ? "green" : "red"}>
                        {product.stockStatus.status === "G" && `In Stock!`}
                        {product.stockStatus.status !== "G" && `Not in Stock`}
                    </Box>
                </Flex>

            </Box>
        </Box>
    )
}
