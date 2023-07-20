import { Box, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { ITEMS_PER_PAGE, START_INDEX } from '../../config/constants'
import { Button } from '../atoms/button'

interface Props {
    pageNo: number
    setPageNo: Dispatch<SetStateAction<number>>
    total: number | undefined
}


export const Pagination = ({ pageNo, setPageNo, total }: Props) => {

    const pageOnClick = (modifier: number) => {
        if ((pageNo + modifier) < START_INDEX) {
            alert("Error, can't go back a page")
            return;
        }
        if (total && ((pageNo + modifier) * ITEMS_PER_PAGE) > total) {
            alert("Error, can't go forward a page")
            return;
        }
        setPageNo(pageNo + modifier)
    }

    return (

        <Box
            w="xs"
            mx="20px"
            display="inline-flex"
        >
            <Button label={"Prev"} mx="auto" onClick={e => pageOnClick(-1)} isDisabled={(pageNo - 1) < START_INDEX} />
            <Text fontSize="x-large">{pageNo}</Text>
            <Button label={"Next"} mx="auto" onClick={e => pageOnClick(1)} />
        </Box>
    )
}
