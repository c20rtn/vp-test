import { Box } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { Dropdown } from '../atoms/dropdown'

interface Props {
    sortType: string
    setSortType: Dispatch<SetStateAction<string>>
}

export const SortBy = ({ sortType, setSortType }: Props) => {
    return (
        <Box
            w="xs"
            mx="20px"
        >
            <Dropdown
                options={[
                    { name: "Recommended", value: "1" },
                    { name: "Low to High", value: "2" },
                    { name: "High to Low", value: "3" },
                    { name: "Highest Discount", value: "4" },
                ]}
                placeholder={"Sort by..."}
                state={sortType}
                onChange={(e) => setSortType(e.target.value)}
            />
        </Box>
    )
}
