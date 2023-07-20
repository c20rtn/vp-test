import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react'
import React from 'react'
import { Facet } from '../../entities'
import { Checkbox } from '../atoms/checkbox'

interface Props {
    facet: Facet
}

export const FilterBox = ({ facet }: Props) => {
    return (
        <AccordionItem id={facet.identifier} mt={"2px"} bg="gray.100" border="1px">
            <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                        {facet.displayName}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel w="full">
                {facet.options.map((option) =>
                    <Checkbox option={option} key={option.displayValue} />
                )}
            </AccordionPanel>
        </AccordionItem>

    )
}
