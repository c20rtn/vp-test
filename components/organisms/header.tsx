import { Box, Flex, Image } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { ProductTypes } from '../../entities'
import { Button } from '../atoms/button'
import { Dropdown } from '../atoms/dropdown'

export interface Props {
    productType: ProductTypes
    setProductType: Dispatch<SetStateAction<ProductTypes>>
}

export const Header = ({ productType, setProductType }: Props) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            p={2}
            bg="green.100"
            shadow="md"
            position="fixed"
            zIndex="100"
        >
            <Image
                w="50px"
                mx="20px"
                src="https://ipohub.blob.core.windows.net/logos/bbf3d4ff-c0e7-4a5c-ad98-f8eac76444e4.png"
                alt="logo"
            />

            <Box
                w="sm"
                mx="20px"
            >
                <Dropdown
                    options={[
                        { name: "Toilets", value: "toilets" },
                        { name: "Baths", value: "baths" },
                        { name: "Showers", value: "showers" },
                        { name: "Basins", value: "basins" },
                        { name: "Taps", value: "taps" },
                    ]}
                    placeholder={"Select a Product!"}
                    state={productType}
                    setState={setProductType as Dispatch<SetStateAction<string>>}
                />
            </Box>

            <Box
                mx="20px"
                display="inline-flex"
            >
                <Button label={"Account"} />
                <Button label={"Basket"} />
            </Box>

        </Flex>
    )
}
