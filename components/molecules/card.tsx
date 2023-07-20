import { Badge, Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Product } from '../../entities'
import { colors } from '../../styles/colors'

interface Props {
    product: Product,
}

export const ProductCard = ({ product }: Props) => {
    return (
        <Box
            maxW='sm'
            minW="300"
            mx={4}
            borderWidth='2px'
            borderColor={colors.primary}
            bg={colors.light}
            overflow='hidden'
            shadow="lg"
            cursor="pointer"
        >
            <Image shadow="md" w="full" maxH="300" objectFit="fill" src={product.image.url} alt={product.image.url} />

            <Box p='6'>
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
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    fontSize="xl"
                >
                    {product.productName}
                </Box>

                <Box color="red.500" fontWeight="bold" fontSize="2xl">
                    £{product.price.priceIncTax}
                    {product.price.isOnPromotion &&
                        <Text color="gray.500" fontWeight="medium" fontSize="md">{`(Was £${product.price.wasPriceIncTax})`}</Text>}
                </Box>

                <Box>
                    {product.stockStatus.status === "G" && `In Stock!`}
                    {product.stockStatus.status !== "G" && `Not in Stock`}
                </Box>

                <Box display='flex' mt='2' alignItems='center'>
                    {product.reviewsCount} reviews
                </Box>
            </Box>
        </Box>
    )
}
